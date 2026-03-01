import React from "react";

function UtilizationHeatmap({ workers }) {
  if (!workers) return null;

  return (
    <div style={card}>
      <h3>Utilization Heatmap</h3>
      <div style={grid}>
        {Object.entries(workers).map(([id, w]) => (
          <div
            key={id}
            style={{
              padding: 20,
              borderRadius: 8,
              background: `rgba(34,197,94, ${w.utilization / 100})`,
              textAlign: "center",
              fontWeight: 600
            }}
          >
            {id}
            <div>{w.utilization.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 25,
  borderRadius: 14,
  marginBottom: 40
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: 15
};

export default UtilizationHeatmap;