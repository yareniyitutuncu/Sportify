import React from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import './Activity.css';

const Activity = () => {
  const navigate = useNavigate(); // React Router yönlendirme fonksiyonunu tanımladık

  const handleStartExercise = () => {
    console.log("Navigating to /fitness-level..."); // Konsola mesaj ekledik
    navigate("/fitness-level"); // Kullanıcıyı FitnessLevel sayfasına yönlendir
  };

  return (
    <div>
      <Header backButton={true} title="Activity"/>
      <div className="activity-container">
        <div className="exercise-section">
          <h2>Start the Exercise</h2>
          <p>Choose your preferred exercise and start your journey!</p>
          <button className="exercise-btn" onClick={handleStartExercise}>
            Start Exercise
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Activity;
