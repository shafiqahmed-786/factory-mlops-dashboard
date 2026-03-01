import React from "react";

function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      background: "#ef4444",
      padding: "10px 20px",
      borderRadius: 6
    }}>
      {message}
    </div>
  );
}

export default Toast;