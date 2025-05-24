import React from "react";

const HomePage = () => {
  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg,rgb(18, 17, 20),rgb(208, 2, 2))",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "3.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.6)"
      }}>
        My Log Monitoring Platform
      </h1>

      <p style={{
        fontSize: "1.4rem",
        maxWidth: "700px",
        marginBottom: "2rem",
        lineHeight: "1.6",
        color: "#f1f1f1"
      }}>
        A fast, lightweight system to stream logs, create tickets, and collaborate in real-time.
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <button style={buttonStyle("red")}>🚀 Moniter Logs</button>
        <button style={buttonStyle("#444")}>☁️ Create Chat</button>
        <button style={buttonStyle("#444")}>🛠️ Manage</button>
      </div>
    </div>
  );
};

const buttonStyle = (bg) => ({
  backgroundColor: bg,
  border: "none",
  color: "#fff",
  padding: "1rem 2rem",
  fontSize: "1rem",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  transition: "transform 0.2s ease",
  textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
  fontWeight: "bold"
});

export default HomePage;
