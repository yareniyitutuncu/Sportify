import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Onboarding.css';  // Onboarding CSS dosyasını import ettik

import image1 from "../assets/exercise1.png";  // Örnek görsel yolu
import image2 from "../assets/exercise2.png";
import image3 from "../assets/exercise3.png";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      image: image1,
      title: "Change the Way You Exercise",
      description: "Discover a new way to exercise with Sportify!"
    },
    {
      id: 2,
      image: image2,
      title: "Track Your Daily Progress",
      description: "See your daily progress and improvements."
    },
    {
      id: 3,
      image: image3,
      title: "The Future of Daily Lifestyle",
      description: "Personalized training for a healthier you."
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const startApp = () => {
    navigate("/home");
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-slide">
        <img src={steps[currentStep].image} alt={steps[currentStep].title} />
        <h2>{steps[currentStep].title}</h2>
        <p>{steps[currentStep].description}</p>
      </div>

      <div className="slider-buttons">
        {currentStep === steps.length - 1 ? (
          <button onClick={startApp} className="start-button">
            Get Started
          </button>
        ) : (
          <button onClick={nextStep} className="next-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
