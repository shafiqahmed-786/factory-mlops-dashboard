# 🏭 AI Factory MLOps Productivity Dashboard

A full-stack production-grade MLOps monitoring system that simulates AI-driven factory events and provides real-time operational analytics, utilization tracking, model confidence monitoring, and performance insights.

---

## 🚀 Overview

This project simulates an AI-powered factory environment where computer vision models generate worker and workstation activity events. These events are ingested into a FastAPI backend and visualized through a modern React dashboard.

The system demonstrates:

- Event ingestion APIs
- Duplicate event protection
- Confidence tracking
- Productivity metrics computation
- Real-time dashboard updates
- Trend comparison
- Multi-shift filtering
- CSV export
- Clean production-ready architecture

---

## 🏗 Architecture

Frontend:
- React (Functional Components + Hooks)
- Axios
- Custom lightweight charts
- Dark production UI

Backend:
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- REST API versioning (`/api/v1`)

---

## 📊 Features

### Core Monitoring
- Worker performance metrics
- Workstation efficiency tracking
- Production rate calculation
- Utilization percentage
- Units per hour

### MLOps Capabilities
- Event ingestion endpoint
- Duplicate event hash protection
- Model confidence monitoring
- Confidence drift indicator
- Trend comparison vs previous seed

### Advanced Dashboard
- Animated KPI cards
- Production trend chart
- Worker ranking
- Multi-shift filter
- CSV export
- Auto-refresh toggle
- Dark theme UI

---

## 🧪 API Endpoints

### Get Metrics

GET /api/v1/metrics


### Create Event

POST /api/v1/events


### Reset Seed

POST /api/v1/seed/reset


---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/factory-mlops-dashboard.git
cd factory-mlops-dashboard
2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000
3️⃣ Frontend Setup

Open new terminal:

cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
🐳 Docker

Backend can be containerized using:

docker build -t factory-backend .
docker run -p 8000:8000 factory-backend