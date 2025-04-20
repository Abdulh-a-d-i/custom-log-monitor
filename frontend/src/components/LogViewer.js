import React, { useEffect, useState, useRef } from "react";
import "./LogViewer.css";

const SEVERITIES = ["ALL", "ERROR", "WARNING", "CRITICAL"];

function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const logsEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/logs");
    const buffer = [];
    let timer = null;
  
    ws.onmessage = (event) => {
      buffer.push(event.data);
  
      if (!timer) {
        timer = setTimeout(() => {
          setLogs((prevLogs) => [...prevLogs, ...buffer]);
          buffer.length = 0;
          timer = null;
        }, 1000); // adjust this delay to control frequency
      }
    };
  
    return () => {
      ws.close();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const filteredLogs = logs.filter((log) =>
    filter === "ALL" ? true : log.toUpperCase().includes(filter)
  );

  return (
    <div className="log-viewer">
      <h2>📡Live Logs</h2>
      <div className="filters">
        {SEVERITIES.map((sev) => (
          <button
            key={sev}
            className={filter === sev ? "active" : ""}
            onClick={() => setFilter(sev)}
          >
            {sev}
          </button>
        ))}
      </div>
      <div className="log-box">
        {filteredLogs.map((log, idx) => (
          <pre key={idx} className={`log-line ${getSeverityClass(log)}`}>
            {log}
          </pre>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

function getSeverityClass(log) {
  if (log.includes("ERROR")) return "error";
  if (log.includes("WARNING")) return "warning";
  if (log.includes("CRITICAL")) return "critical";
  return "info";
}

export default LogViewer;
