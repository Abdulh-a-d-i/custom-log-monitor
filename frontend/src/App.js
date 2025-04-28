import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogsPage from "./pages/LogsPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav style={{ backgroundColor: "#222", padding: "1rem" }}>
          <Link to="/" style={{ margin: "0 1rem", color: "white" }}>Home</Link>
          <Link to="/logs" style={{ margin: "0 1rem", color: "white" }}>Logs</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
