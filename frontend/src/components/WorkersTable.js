import React, { useState } from "react";

function WorkersTable({ workers }) {
  // ✅ Hooks MUST be first
  const [sortKey, setSortKey] = useState("utilization");
  const [sortDesc, setSortDesc] = useState(true);

  if (!workers) return null;

  const sortedWorkers = Object.entries(workers).sort((a, b) => {
    const valA = a[1][sortKey] ?? 0;
    const valB = b[1][sortKey] ?? 0;
    return sortDesc ? valB - valA : valA - valB;
  });

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const getBadgeColor = (util) => {
    if (util > 75) return "#22c55e";
    if (util > 50) return "#facc15";
    return "#ef4444";
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <h2 style={{ marginBottom: 15 }}>Worker Performance</h2>

      <div
        style={{
          background: "#111827",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#1f2937" }}>
            <tr>
              <th style={th}>Worker</th>
              <th style={thClickable} onClick={() => toggleSort("active_time")}>
                Active (hrs)
              </th>
              <th style={thClickable} onClick={() => toggleSort("idle_time")}>
                Idle (hrs)
              </th>
              <th style={thClickable} onClick={() => toggleSort("units")}>
                Units
              </th>
              <th style={thClickable} onClick={() => toggleSort("utilization")}>
                Util %
              </th>
              <th
                style={thClickable}
                onClick={() => toggleSort("units_per_hour")}
              >
                Units/Hr
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedWorkers.map(([id, w], index) => (
              <tr
                key={id}
                style={{
                  background:
                    index % 2 === 0 ? "#111827" : "#0f172a",
                  transition: "0.2s",
                }}
              >
                <td style={tdStrong}>{id}</td>
                <td style={td}>{w.active_time.toFixed(2)}</td>
                <td style={td}>{w.idle_time.toFixed(2)}</td>
                <td style={td}>{w.units}</td>
                <td style={td}>
                  <span
                    style={{
                      background: getBadgeColor(w.utilization),
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {w.utilization.toFixed(2)}%
                  </span>
                </td>
                <td style={td}>{w.units_per_hour.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "14px",
  textAlign: "left",
  color: "#9ca3af",
  fontWeight: 500,
};

const thClickable = {
  ...th,
  cursor: "pointer",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #1f2937",
  color: "#e5e7eb",
};

const tdStrong = {
  ...td,
  fontWeight: 600,
};

export default WorkersTable;