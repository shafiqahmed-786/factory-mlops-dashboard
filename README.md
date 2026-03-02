🏭 AI-Powered Worker Productivity Dashboard

A production-style full-stack web application that ingests AI-generated CCTV activity events, stores them in a database, computes productivity metrics, and visualizes them through a real-time monitoring dashboard.

🚀 Project Overview

This system simulates an AI-powered factory environment where computer vision models detect worker activity and emit structured events. The application:

Ingests AI-generated events

Stores them persistently

Computes worker, workstation, and factory-level productivity metrics

Displays insights via a modern dashboard

The goal is to demonstrate production-style system design, MLOps thinking, and monitoring architecture — not to build ML models.

🏗 Architecture Overview (Edge → Backend → Dashboard)
1️⃣ Edge Layer (AI CCTV Cameras)

Cameras run computer vision models

Models emit structured JSON events

Events include:

timestamp

worker_id

workstation_id

event_type

confidence

count (for product_count)

Example:

{
  "timestamp": "2026-01-15T10:15:00Z",
  "worker_id": "W1",
  "workstation_id": "S3",
  "event_type": "working",
  "confidence": 0.93,
  "count": 1
}
2️⃣ Backend Layer (FastAPI)

Receives events via REST API

Deduplicates events

Stores events in SQLite

Computes productivity metrics dynamically

Exposes /api/v1/metrics endpoint

Backend responsibilities:

Persistence

Aggregation

Business logic

Monitoring logic

3️⃣ Dashboard Layer (React)

Fetches metrics from backend

Displays:

Factory summary

Worker metrics

Workstation metrics

Allows filtering

Allows dummy data reset

Supports CSV export

🗄 Database Schema
Workers Table
Column	Type	Description
worker_id	TEXT (PK)	Unique worker ID
name	TEXT	Worker name
Workstations Table
Column	Type	Description
station_id	TEXT (PK)	Unique station ID
name	TEXT	Station name/type
Events Table
Column	Type	Description
id	INTEGER (PK)	Auto-increment ID
event_hash	TEXT (Unique)	SHA-based hash for duplicate prevention
timestamp	DATETIME	Event time
worker_id	TEXT	FK to workers
workstation_id	TEXT	FK to workstations
event_type	TEXT	working / idle / absent / product_count
confidence	FLOAT	Model confidence
count	INTEGER	Units produced (for product_count)

All events are persisted.

Database is pre-seeded via:

POST /api/v1/seed/reset
📊 Metric Definitions
Worker-Level Metrics
Total Active Time

Sum of time deltas between consecutive "working" events.

Total Idle Time

Sum of time deltas between consecutive "idle" events.

Utilization %
Utilization = Active Time / (Active + Idle Time) × 100
Total Units Produced

Sum of all product_count event counts for that worker.

Units per Hour
Units per Hour = Total Units / Active Time
Workstation-Level Metrics
Occupancy Time

Time during which any worker was in "working" state at that station.

Utilization %
Occupancy Time / Total Observed Time × 100
Total Units Produced

Sum of product_count events associated with the station.

Throughput Rate
Total Units / Occupancy Time
Factory-Level Metrics
Total Productive Time

Sum of all worker active times.

Total Production Count

Sum of all product_count events.

Average Production Rate
Total Production / Total Active Time
Average Utilization

Mean utilization across all workers.

⏱ Time Assumptions

Because events are discrete:

Time deltas are computed between consecutive activity events

If the last event has no successor, it is ignored

We assume ordered ingestion

Time resolution is based on timestamp differences

Production events are aggregated independently of state events but associated with time windows.

⚙ Handling Production Scenarios
Intermittent Connectivity

Backend accepts events idempotently

Events are persisted immediately

System tolerates delayed ingestion

Future improvement:

Event queue (Kafka / Redis Stream)

Duplicate Events

Each event generates a deterministic SHA-based event_hash

Database enforces uniqueness constraint

Duplicate insertions are rejected

Out-of-Order Timestamps

Currently:

Metrics computed on sorted timestamps

Future improvement:

Strict event ordering enforcement

Watermarking logic

🧠 Theoretical Questions
1️⃣ How Would You Add Model Versioning?

Add model_version column to events

Track metrics by version

Compare production output per version

Enable A/B performance comparison

2️⃣ How Would You Detect Model Drift?

Monitor confidence distribution over time

Track drop in average confidence

Compare production output vs historical baseline

Alert if utilization changes disproportionately

3️⃣ How Would You Trigger Retraining?

Threshold-based triggers:

Confidence < 0.85 sustained

Drop in throughput > X%

Automated pipeline:

Log flagged data

Retraining job via CI/CD

Model registry update

4️⃣ How Does This Scale?
5 Cameras

Single FastAPI instance

SQLite sufficient

100+ Cameras

Switch to PostgreSQL

Add async ingestion

Introduce message queue (Kafka)

Horizontal backend scaling

Multi-Site

Multi-tenant architecture

Site-level partitioning

Centralized monitoring service

Cloud deployment (Kubernetes)

🐳 Containerization

Backend is dockerized.

Build:

docker build -t factory-backend .

Run:

docker run -p 8000:8000 factory-backend

Frontend can be deployed on Vercel or containerized similarly.

🚀 How to Run Locally
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend
cd frontend
npm install
npm start
📈 Tradeoffs & Design Decisions
Decision	Tradeoff
SQLite	Simplicity over distributed scalability
Polling	Simpler than WebSockets
On-request metric computation	No background workers needed
Hardcoded metadata	Faster setup for evaluation
🔮 Future Improvements

WebSocket real-time streaming

PostgreSQL migration

Background aggregation workers

CI/CD pipeline

Kubernetes deployment

Prometheus monitoring

📦 Deliverables

GitHub Repository

Dockerized backend

Web application

Complete documentation

🏁 Conclusion

This project demonstrates production-style system design for AI monitoring systems in manufacturing environments. It combines event ingestion, data persistence, metric computation, observability, and dashboard visualization into a cohesive architecture.
