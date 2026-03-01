import React from "react";

function WorkstationsTable({ workstations }) {
  if (!workstations) return null;

  const sortedStations = Object.entries(workstations)
    .sort((a, b) => b[1].throughput_per_hour - a[1].throughput_per_hour);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Workstation Efficiency</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "15px"
      }}>
        <thead>
          <tr
  style={{
    background: "#1e293b",
    color: "#cbd5e1"
  }}
>
            <th style={th}>Station</th>
            <th style={th}>Occupancy (hrs)</th>
            <th style={th}>Idle (hrs)</th>
            <th style={th}>Units</th>
            <th style={th}>Utilization %</th>
            <th style={th}>Throughput / Hr</th>
          </tr>
        </thead>

        <tbody>
          {sortedStations.map(([id, s]) => (
            <tr key={id}>
              <td style={td}>{id}</td>
              <td style={td}>{s.active_time.toFixed(2)}</td>
              <td style={td}>{s.idle_time.toFixed(2)}</td>
              <td style={td}>{s.units}</td>
              <td style={td}>{s.utilization.toFixed(2)}%</td>
              <td style={td}>{s.throughput_per_hour.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};

export default WorkstationsTable;