import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Header stil dosyasını import ediyoruz

const Header = ({ title, backButton }) => {
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications] = useState([
    "We missed you! Come back and check new features.",
    "New updates are available. Update your app!",
    "Don't forget to stay hydrated, drink some water!"
  ]);
  
  const toggleNotifications = () => {
    setOpenNotifications(!openNotifications);
  };

  const handleBack = () => {
    navigate('/home'); // Back butonuna tıklanınca Home sayfasına yönlendirilecek
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img
          src="/src/assets/sportifyicon1.png" 
          alt="Logo" 
          className="logo-img" 
        />
      </div>

      <div className="header-center">
        <h1 className="header-title">{title}</h1>  {/* Dinamik başlık */}
      </div>

      <div className="header-right">
        {backButton && (
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        )}
        {/* Bildirim Butonu */}
        <button className="notification-btn" onClick={toggleNotifications}>
          <i className="notification-icon">🔔</i> {/* Notification ikonu */}
        </button>
      </div>

      {/* Bildirimler */}
      {openNotifications && (
        <div className="notifications-dropdown">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
