import React from "react";

function WorkerChart({ workers }) {
  if (!workers) return null;

  const maxUnits = Math.max(...Object.values(workers).map(w => w.units));

  return (
    <div className="card">
      <h3>Worker Production Chart</h3>
      <svg width="100%" height="200">
        {Object.entries(workers).map(([id, w], index) => {
          const barHeight = (w.units / maxUnits) * 150;
          return (
            <g key={id}>
              <rect
                x={index * 60}
                y={180 - barHeight}
                width="40"
                height={barHeight}
                fill="#3b82f6"
              />
              <text
                x={index * 60 + 10}
                y="195"
                fill="white"
                fontSize="12"
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WorkerChart;