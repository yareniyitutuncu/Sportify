import React from "react";
import { Link } from "react-router-dom"; // React Router kullanarak yönlendirme işlemi
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            {/* Home ikonu */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/activity" className="nav-link">
            {/* Activity ikonu */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12l9-9 9 9-9 9-9-9z"/>
            </svg>
            Activity
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/calendar" className="nav-link">
            {/* Calendar ikonu */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 3h-3V1h-4v2H5c-1.1 0-1.99.89-1.99 2L3 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.89 2-2V5c0-1.1-.89-2-2-2z"/>
            </svg>
            Calendar
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            {/* Profile ikonu */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
