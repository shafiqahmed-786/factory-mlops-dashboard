from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import Event
from .schemas import EventCreate
from .seed import seed_data, reset_seed
from .metrics import compute_metrics
from .utils import generate_event_hash

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Factory MLOps API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api/v1"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup():
    db = SessionLocal()
    seed_data(db)
    db.close()

@app.post(f"{API_PREFIX}/events")
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    event_hash = generate_event_hash(event)

    existing = db.query(Event).filter(Event.event_hash == event_hash).first()
    if existing:
        raise HTTPException(status_code=409, detail="Duplicate event")

    db_event = Event(**event.dict(), event_hash=event_hash)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.get(f"{API_PREFIX}/metrics")
def get_metrics(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    return compute_metrics(events)

@app.post(f"{API_PREFIX}/seed/reset")
def reset_data(db: Session = Depends(get_db)):
    reset_seed(db)
    return {"message": "Seed reset successful"}