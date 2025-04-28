import React from "react";
import LogViewer from "../components/LogViewer"; // Assuming it exists

const LogsPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Live Logs</h2>
      <LogViewer />
    </div>
  );
};

export default LogsPage;
