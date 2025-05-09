import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // optional CSS for styles

const NavBar = () => {
  return (
    <header className="top-nav">
      <div className="logo">🔧 My Platform</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/logs">Logs</Link>
        <Link to="/tickets">Tickets</Link>
      </nav>
      <div className="top-buttons">
        <button className="btn primary">Try It</button>
        <button className="btn secondary">Login</button>
      </div>
    </header>
  );
};

export default NavBar;
