from .models import Worker, Workstation, Event
from datetime import datetime, timedelta
import random
import hashlib

def seed_data(db):
    if db.query(Worker).first():
        return

    for i in range(1, 7):
        db.add(Worker(id=f"W{i}", name=f"Worker {i}"))
        db.add(Workstation(id=f"S{i}", name=f"Station {i}"))

    db.commit()

    now = datetime.utcnow()

    for i in range(1, 7):
        for j in range(20):
            timestamp = now - timedelta(minutes=random.randint(0, 600))
            event_type = random.choice(["working", "idle", "product_count"])
            count = random.randint(1, 5)

            raw = f"{timestamp}-{i}-{j}"
            event_hash = hashlib.sha256(raw.encode()).hexdigest()

            db.add(Event(
                event_hash=event_hash,
                timestamp=timestamp,
                worker_id=f"W{i}",
                workstation_id=f"S{i}",
                event_type=event_type,
                confidence=0.9,
                count=count
            ))

    db.commit()

def reset_seed(db):
    db.query(Event).delete()
    db.commit()
    seed_data(db)