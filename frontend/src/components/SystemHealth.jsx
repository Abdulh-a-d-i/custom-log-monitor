import React from "react";
import "../styles/SystemHealth.css";

const SystemHealth = () => {
  return (
    <div className="system-health">
      <h2>🧠 System Health</h2>
      <div className="health-card">
        <div className="metric">
          <h3>CPU Usage</h3>
          <div className="progress-bar"><div className="fill" style={{ width: "65%" }} /></div>
        </div>
        <div className="metric">
          <h3>Memory Usage</h3>
          <div className="progress-bar"><div className="fill" style={{ width: "70%" }} /></div>
        </div>
        <div className="metric">
          <h3>Disk Usage</h3>
          <div className="progress-bar"><div className="fill" style={{ width: "50%" }} /></div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
