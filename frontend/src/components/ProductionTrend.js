import React from "react";

function ProductionTrend({ workers }) {
  if (!workers) return null;

  const data = Object.values(workers).map(w => w.units);
  const max = Math.max(...data);

  const points = data.map((val, i) => {
    const x = i * 60;
    const y = 200 - (val / max) * 150;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={card}>
      <h3>Production Trend</h3>
      <svg width="100%" height="220">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
}

const card = {
  background: "#111827",
  padding: 20,
  borderRadius: 12,
  marginBottom: 30
};

export default ProductionTrend;