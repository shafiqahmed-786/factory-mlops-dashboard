import React, { useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < value) {
        setDisplayValue(start);
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [value]);

  return (
    <span>
      {typeof value === "number"
        ? displayValue.toFixed(2)
        : value}
      {suffix}
    </span>
  );
}

function MetricCard({ title, value, suffix = "", accent }) {
  return (
    <div style={{ ...cardStyle, borderTop: `3px solid ${accent}` }}>
      <div style={labelStyle}>{title}</div>
      <div style={valueStyle}>
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
    </div>
  );
}

function FactorySummary({ factory }) {
  if (!factory) return null;

  return (
    <div style={{ marginBottom: 50 }}>
      <h2 style={headingStyle}>Factory Overview</h2>

      <div style={gridStyle}>
        <MetricCard
          title="Total Units"
          value={factory.total_units}
          accent="#3b82f6"
        />

        <MetricCard
          title="Active Time (hrs)"
          value={factory.total_active_time}
          accent="#10b981"
        />

        <MetricCard
          title="Avg Utilization"
          value={factory.average_utilization}
          suffix="%"
          accent="#f59e0b"
        />

        <MetricCard
          title="Production Rate (units/hr)"
          value={factory.production_rate}
          accent="#ef4444"
        />
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const headingStyle = {
  marginBottom: 25,
  fontSize: 22,
  fontWeight: 600,
  color: "#e5e7eb"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20
};

const cardStyle = {
  background: "linear-gradient(145deg, #1f2937, #111827)",
  padding: 25,
  borderRadius: 14,
  boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
  transition: "all 0.25s ease",
  cursor: "pointer"
};

const labelStyle = {
  fontSize: 14,
  opacity: 0.6,
  marginBottom: 10,
  letterSpacing: 0.5
};

const valueStyle = {
  fontSize: 28,
  fontWeight: 700,
  color: "#ffffff"
};

export default FactorySummary;