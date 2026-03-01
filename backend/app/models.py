from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base

class Worker(Base):
    __tablename__ = "workers"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)

class Workstation(Base):
    __tablename__ = "workstations"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    event_hash = Column(String, unique=True, index=True)

    timestamp = Column(DateTime)
    worker_id = Column(String, ForeignKey("workers.id"))
    workstation_id = Column(String, ForeignKey("workstations.id"))
    event_type = Column(String)
    confidence = Column(Float)
    count = Column(Integer, default=0)