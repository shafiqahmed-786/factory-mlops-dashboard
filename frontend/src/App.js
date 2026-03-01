import React, { useEffect, useState } from "react";
import { getMetrics, resetSeed } from "./api";
import FactorySummary from "./components/FactorySummary";
import WorkersTable from "./components/WorkersTable";
import WorkstationsTable from "./components/WorkstationsTable";
import EventForm from "./components/EventForm";
import ProductionTrend from "./components/ProductionTrend";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState("ALL");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [previousFactory, setPreviousFactory] = useState(null);

  const fetchData = async () => {
  try {
    setLoading(true);

    const response = await getMetrics();

    if (data?.factory) {
      setPreviousFactory(data.factory);
    }

    setData(response.data);
  } catch (error) {
    console.error("Fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

  const handleReset = async () => {
    await resetSeed();
    fetchData();
  };

  const exportCSV = () => {
    if (!data?.workers) return;

    const rows = Object.entries(data.workers).map(([id, w]) =>
      `${id},${w.active_time},${w.idle_time},${w.units},${w.utilization}`
    );

    const csvContent =
      "Worker,Active,Idle,Units,Utilization\n" + rows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "worker_metrics.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchData, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinner}></div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <div style={headerSection}>
        <h1 style={{ margin: 0 }}>AI Factory Productivity Dashboard</h1>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={fetchData} style={primaryButton}>
            Refresh
          </button>

          <button onClick={handleReset} style={dangerButton}>
            Reset Seed
          </button>

          <button onClick={exportCSV} style={primaryButton}>
            Export CSV
          </button>

          <label style={{ marginLeft: 20, fontSize: 14 }}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
              style={{ marginRight: 6 }}
            />
            Auto Refresh (5s)
          </label>
        </div>
      </div>

      {/* KPI */}
      <FactorySummary factory={data.factory} />

      {/* Production Trend */}
      <ProductionTrend workers={data.workers} />

      

      {/* Filter */}
      <div style={{ marginBottom: 25 }}>
        <label style={{ marginRight: 10 }}>Filter Worker:</label>
        <select
          value={selectedWorker}
          onChange={(e) => setSelectedWorker(e.target.value)}
          style={selectStyle}
        >
          <option value="ALL">All</option>
          {Object.keys(data.workers).map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* Tables */}
      <WorkersTable
        workers={
          selectedWorker === "ALL"
            ? data.workers
            : { [selectedWorker]: data.workers[selectedWorker] }
        }
      />

      <WorkstationsTable workstations={data.workstations} />

      {/* Event Form */}
      <EventForm onSuccess={fetchData} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "40px",
  color: "white",
  fontFamily: "Inter, sans-serif"
};

const headerSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 40
};

const primaryButton = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
  marginRight: 10,
  transition: "all 0.2s ease"
};

const dangerButton = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
  marginRight: 10,
  transition: "all 0.2s ease"
};

const selectStyle = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #374151",
  background: "#1f2937",
  color: "white"
};

const loadingStyle = {
  background: "#0f172a",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontSize: 20,
  color: "white"
};

const spinner = {
  width: 40,
  height: 40,
  border: "4px solid #1f2937",
  borderTop: "4px solid #3b82f6",
  borderRadius: "50%",
  marginBottom: 20,
  animation: "spin 1s linear infinite"
};

export default App;