import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar"; 
import Header from './Header'; 
import { Link } from "react-router-dom";  // Link bileşenini import ediyoruz
import './Home.css';

const Home = () => {
  const [quote, setQuote] = useState("");  // Motivasyon Sözleri
  const [recipe, setRecipe] = useState(""); // Yemek Tarifleri

  useEffect(() => {
    const quotes = [
      "You can do it!",
      "Believe in yourself!",
      "Keep pushing forward!",
      "Stay strong!",
      "You are unstoppable!",
      "Success starts with self-belief!",
      "Push yourself because no one else is going to do it for you.",
      "Believe in the process, push your limits, and watch yourself grow stronger every day.",
      "The only limit is the one you set yourself.",
      "Don't stop when you're tired, stop when you're done.",
      "Dream big, work hard, stay focused.",
      "Your only competition is the person you were yesterday.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Believe you can, and you're halfway there.",
      "The journey of a thousand miles begins with one step."
    ];

    // Motivasyon sözünü rastgele seç
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Sağlıklı yemek tariflerini ekle
    const recipes = [
      { id: 1, name: "Chicken Salad", description: "A nutritious chicken salad", image: "/src/assets/chicken-salad.jpg" },
      { id: 2, name: "Avocado Toast", description: "Healthy avocado toast", image: "/src/assets/avocado-toast.jpg" },
      { id: 3, name: "Oatmeal with Fruit", description: "Oatmeal with fresh fruits", image: "/src/assets/oatmeal.jpg" },
      { id: 4, name: "Grilled Salmon", description: "Delicious grilled salmon", image: "/src/assets/grilled-salmon.jpg" },
      { id: 5, name: "Vegetable Stir Fry", description: "Veggie stir fry with tofu", image: "/src/assets/stir-fry.jpg" },
      { id: 6, name: "Quinoa and Chicken Salad", description: "A nutritious quinoa and chicken salad, perfect for fueling workouts.", image: "/src/assets/quinoa-chicken-salad.jpg" },
      { id: 7, name: "Beef Stew", description: "A hearty beef stew for those cozy days.", image: "/src/assets/beef-stew.jpg" },
      { id: 8, name: "Greek Yogurt Parfait", description: "A sweet and healthy parfait with yogurt, fruits, and granola.", image: "/src/assets/greek-yogurt-parfait.jpg" },
      { id: 9, name: "Chickpea Salad", description: "A protein-packed chickpea salad with fresh vegetables.", image: "/src/assets/chickpea-salad.jpg" },
      { id: 10, name: "Zucchini Noodles with Pesto", description: "Low-carb zucchini noodles topped with fresh pesto sauce.", image: "/src/assets/zucchini-noodles.jpg" }
    ];

    // Rastgele yemek tarifini seç
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    setRecipe(randomRecipe);  // Rastgele tarif seçiliyor

  }, []); // Yalnızca component mount olduğunda çalışacak

  return (
    <div>
      <NavigationBar />
      <Header backButton={false} title="Home" />

      <div className="home-container">
        <div className="content-container">
          {/* Motivasyon Sözleri */}
          <div className="section motivational-quotes">
            <h2>Today's Motivation</h2>
            <p className="quote-text">{quote}</p>
          </div>

          {/* Sağlıklı Yemek Tarifleri */}
          <div className="section healthy-recipes">
            <h2>Healthy Recipe of the Day</h2>
            <div className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <div className="recipe-text">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">View Recipe</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
