import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from './Header'; 
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();  // URL'den id parametresini alıyoruz
  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // Default tab is 'overview'

  useEffect(() => {
    const recipes = [
      { id: 1, name: "Chicken Salad", ingredients: ["1 cup quinoa", "2 cups water", "2 chicken breasts"], directions: ["Cook quinoa", "Grill chicken"], image: "/src/assets/chicken-salad.jpg", overview: "A tasty and healthy chicken salad, perfect for a nutritious lunch or dinner." },
      { id: 2, name: "Avocado Toast",ingredients: ["2 slices bread", "1 avocado", "Salt, pepper"], directions: ["Toast bread", "Mash avocado"], image: "/src/assets/avocado-toast.jpg", overview: "A quick and healthy breakfast option that packs a punch with healthy fats." },
      { id: 3, name: "Oatmeal with Fruit", ingredients: ["1 cup oats", "1 banana", "1/2 cup blueberries"], directions: ["Cook oats", "Add fruit"], image: "/src/assets/oatmeal.jpg", overview: "Start your day with a warm and filling bowl of oatmeal topped with fresh fruits." },
      { id: 4, name: "Grilled Salmon", ingredients: ["2 salmon fillets", "Olive oil", "Salt"], directions: ["Grill salmon", "Season with salt"], image: "/src/assets/grilled-salmon.jpg", overview: "Healthy, savory grilled salmon perfect for a nutritious meal." },
      { id: 5, name: "Vegetable Stir Fry", ingredients: ["1 cup tofu", "2 cups vegetables", "Soy sauce"], directions: ["Stir fry tofu", "Add vegetables and soy sauce"], image: "/src/assets/stir-fry.jpg", overview: "A colorful and tasty veggie stir fry loaded with vitamins and protein from tofu." },
      { id: 6, name: "Quinoa and Chicken Salad", ingredients: ["1 cup quinoa", "2 chicken breasts", "1 cup mixed greens"], directions: ["Cook quinoa", "Grill chicken", "Mix ingredients"], image: "/src/assets/quinoa-chicken-salad.jpg", overview: "A high-protein, nutrient-dense salad for a filling and energizing meal." },
      { id: 7, name: "Beef Stew", ingredients: ["1 lb beef", "1 onion", "3 cups beef broth"], directions: ["Cook beef", "Add onion and broth", "Simmer stew"], image: "/src/assets/beef-stew.jpg", overview: "A warm and comforting stew, perfect for the colder months." },
      { id: 8, name: "Greek Yogurt Parfait", ingredients: ["1 cup Greek yogurt", "1/2 cup granola", "1/2 cup mixed berries"], directions: ["Layer yogurt, granola, and berries"], image: "/src/assets/greek-yogurt-parfait.jpg", overview: "A refreshing and light dessert or snack option, rich in protein." },
      { id: 9, name: "Chickpea Salad", ingredients: ["1 can chickpeas", "1 cucumber", "1 red pepper"], directions: ["Mix chickpeas with veggies", "Add dressing"], image: "/src/assets/chickpea-salad.jpg", overview: "A simple, healthy salad with protein-rich chickpeas and crunchy veggies." },
      { id: 10, name: "Zucchini Noodles with Pesto",ingredients: ["2 zucchinis", "1/2 cup pesto", "Parmesan cheese"], directions: ["Spiralize zucchini", "Toss with pesto", "Top with Parmesan"], image: "/src/assets/zucchini-noodles.jpg", overview: "A low-carb, flavorful pasta alternative with fresh pesto and zucchini noodles." }
    ];

    const foundRecipe = recipes.find(recipe => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <Header backButton={true} />
      
      <div className="recipe-detail">
        <div className="recipe-header">
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <h2>{recipe.name}</h2> {/* Tarif ismi gösteriliyor */}
          <p className="recipe-description">{recipe.description}</p>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')}>
            Overview
          </button>
          <button className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => handleTabChange('ingredients')}>
            Ingredients
          </button>
          <button className={`tab-btn ${activeTab === 'directions' ? 'active' : ''}`} onClick={() => handleTabChange('directions')}>
            Directions
          </button>
        </div>

        <div className="recipe-content">
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <div className="overview">
              <p>{recipe.overview}</p> {/* Her tarifin kendi 'overview' metni burada */}
            </div>
          )}

          {/* Ingredients Section */}
          {activeTab === 'ingredients' && (
            <div className="ingredients">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Directions Section */}
          {activeTab === 'directions' && (
            <div className="directions">
              <h3>Directions</h3>
              <ul>
                {recipe.directions.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
