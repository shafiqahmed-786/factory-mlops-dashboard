import React, { useState } from "react";
import { createEvent } from "../api";

function EventForm({ onSuccess }) {
  const [worker, setWorker] = useState("W1");
  const [station, setStation] = useState("S1");
  const [type, setType] = useState("working");

  const handleSubmit = async () => {
    await postEvent({
      timestamp: new Date().toISOString(),
      worker_id: worker,
      workstation_id: station,
      event_type: type,
      confidence: 0.95,
      count: type === "product_count" ? 1 : 0
    });

    onSuccess();
  };

  return (
    <div style={card}>
      <h3 style={{ marginBottom: 20 }}>Add Event</h3>

      <div style={row}>
        <select value={worker} onChange={(e) => setWorker(e.target.value)} style={input}>
          {[1,2,3,4,5,6].map(i => (
            <option key={i} value={`W${i}`}>W{i}</option>
          ))}
        </select>

        <select value={station} onChange={(e) => setStation(e.target.value)} style={input}>
          {[1,2,3,4,5,6].map(i => (
            <option key={i} value={`S${i}`}>S{i}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
          <option value="working">Working</option>
          <option value="idle">Idle</option>
          <option value="product_count">Product Count</option>
        </select>

        <button onClick={handleSubmit} style={button}>
          Add Event
        </button>
      </div>
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 25,
  borderRadius: 14,
  marginTop: 50,
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
};

const row = {
  display: "flex",
  gap: 15,
  flexWrap: "wrap"
};

const input = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #374151",
  background: "#1f2937",
  color: "white"
};

const button = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer"
};

export default EventForm;