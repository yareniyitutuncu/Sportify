import React from "react";
import Header from './Header';
import './Activity.css';  // CSS dosyasını import ettik

const Activity = () => {
  return (
    <div>
      <Header backButton={true} title="Activity"/>
      <div className="activity-container">
        <div className="exercise-section">
          <h2>Start the Exercise</h2>
          <p>Choose your preferred exercise and start your journey!</p>
          <button className="exercise-btn">Start Exercise</button>
        </div>

        <div className="progress-section">
          <h2>Progress</h2>
          <p>Track your progress and see how much you've improved!</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }}></div> {/* Progress can be dynamic */}
          </div>
          <p className="progress-text">50% completed</p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
