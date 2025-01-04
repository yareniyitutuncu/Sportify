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
import FitnessLevel from "./components/FitnessLevel"; // Kullanıcının egzersiz seviyesini seçtiği sayfa
import GoalSelection from "./components/GoalSelection"; // Kullanıcının hedefini seçtiği sayfa
import TargetArea from "./components/TargetArea"; // Kullanıcının çalışmak istediği bölgeyi seçtiği sayfa
import ExerciseRecommendation from "./components/ExerciseRecommendation"; // Modelden egzersiz önerilerini aldığı sayfa
import Completed from "./components/Completed";  // Yeni sayfa eklendi


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Yemek tarifinin detay sayfası */}
         {/* Egzersiz adımları */}
        <Route path="/fitness-level" element={<FitnessLevel />} />
        <Route path="/goal" element={<GoalSelection />} />
        <Route path="/target-area" element={<TargetArea />} />
        <Route path="/recommendation" element={<ExerciseRecommendation />} />
        <Route path="/completed" element={<Completed />} /> {/* Yeni sayfa tanımlandı */}


      </Routes>
    
  );
};

export default App;