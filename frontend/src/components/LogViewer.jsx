import React, { useEffect, useState, useRef } from "react";
import "../styles/LogViewer.css";

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
        }, 1000); // 1 second batching
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

  const handleRightClick = (e, log) => {
    e.preventDefault(); // prevent default browser context menu
    const confirmCreate = window.confirm("Create a ticket for this log?");
    if (confirmCreate) {
      createTicket(log);
    }
  };

  const createTicket = async (log) => {
    try {
      const response = await fetch("http://localhost:8000/create-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ log }),
      });
      if (response.ok) {
        alert("Ticket created successfully!");
      } else {
        alert("Failed to create ticket.");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Error creating ticket.");
    }
  };

  return (
    <div className="log-viewer">
      <h2>📡 Live Logs</h2>

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
          <pre
            key={idx}
            className={`log-line ${getSeverityClass(log)}`}
            onContextMenu={(e) => handleRightClick(e, log)}
          >
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
