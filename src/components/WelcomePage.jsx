import React from "react";
import { useNavigate } from "react-router-dom";
import './WelcomePage.css'; // Stil dosyasını import ediyoruz
import backgroundImage from '../assets/arkaplan.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
        <div className="welcome-container" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="welcome-box">
        <h1>
          Welcome to <span>Sportify</span>!
        </h1>
        <button
          className="welcome-button"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
