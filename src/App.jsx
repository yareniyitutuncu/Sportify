import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WelcomePage from "./components/WelcomePage";
import AuthPage from "./components/AuthPage";
import Onboarding from "./components/Onboarding";
import Home from "./components/Home";
import Activity from "./components/Activity"; // Activity sayfasını import ediyoruz
import Calendar from "./components/Calendar"; // Calendar sayfasını import ediyoruz
import Profile from "./components/Profile";
import RecipeDetail from './components/RecipeDetail'; // Tarif detay bileşeni


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
       <Route path="/home" element={<Home />} />
       <Route path="/activity" element={<Activity />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Yemek tarifinin detay sayfası */}


      </Routes>
    </Router>
  );
};

export default App;