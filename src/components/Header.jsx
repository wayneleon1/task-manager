import React from "react";
export default function Header({ children }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          Sprint<span>Board</span>
        </h1>
        <span className="header-badge">v2.0</span>
      </div>

      <div className="header-right">
        {children}
        <div className="health-indicator">
          <span className="health-pulse" />
          Live
        </div>
      </div>
    </header>
  );
}
