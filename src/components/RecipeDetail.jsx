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
      { 
        id: 1, 
        name: "Chicken Salad", 
        ingredients: [
          "1 cup quinoa", 
          "2 cups water", 
          "2 chicken breasts", 
          "1 cup spinach", 
          "1/2 cucumber", 
          "1/2 cup cherry tomatoes", 
          "1 tablespoon olive oil", 
          "1 tablespoon lemon juice", 
          "Salt and pepper to taste"
        ], 
        directions: [
          "1. Cook quinoa: Rinse quinoa under cold water. In a medium pot, combine quinoa and water. Bring to a boil, then reduce to a simmer and cover. Cook for 15-20 minutes or until the quinoa is tender and water is absorbed.",
          "2. Grill chicken: Season chicken breasts with olive oil, salt, and pepper. Grill over medium heat for 6-7 minutes per side, or until fully cooked. Let it rest for a few minutes before slicing.",
          "3. Assemble the salad: In a large bowl, combine cooked quinoa, sliced chicken, chopped spinach, cucumber, and cherry tomatoes.",
          "4. Dress the salad: Drizzle with lemon juice and olive oil. Toss to combine and season with salt and pepper."
        ], 
        image: "/src/assets/chicken-salad.jpg", 
        overview: "A delicious and healthy chicken salad packed with lean protein from the chicken and fiber from the quinoa and vegetables. A perfect light yet filling meal." 
      },
      { 
        id: 2, 
        name: "Avocado Toast", 
        ingredients: [
          "2 slices of whole-grain bread", 
          "1 ripe avocado", 
          "Salt, pepper", 
          "1 tablespoon olive oil", 
          "Lemon juice", 
          "Red pepper flakes (optional)"
        ], 
        directions: [
          "1. Toast the bread: Toast the slices of whole-grain bread until golden and crispy.",
          "2. Prepare the avocado: Slice the avocado in half, remove the pit, and scoop the flesh into a bowl. Mash it with a fork until smooth.",
          "3. Season: Add salt, pepper, a squeeze of lemon juice, and red pepper flakes to the mashed avocado.",
          "4. Assemble the toast: Spread the mashed avocado generously onto the toasted bread slices. Drizzle with olive oil and enjoy!"
        ], 
        image: "/src/assets/avocado-toast.jpg", 
        overview: "A simple yet nutritious breakfast option. The healthy fats from the avocado, combined with the fiber from the whole grain bread, make this an energizing and satisfying meal." 
      },
      { 
        id: 3, 
        name: "Oatmeal with Fruit", 
        ingredients: [
          "1 cup oats", 
          "1 banana", 
          "1/2 cup blueberries", 
          "1 tablespoon honey", 
          "1/2 cup almond milk"
        ], 
        directions: [
          "1. Cook the oats: In a small pot, combine oats and almond milk. Bring to a boil, then simmer for about 5-7 minutes, stirring occasionally.",
          "2. Prepare the fruit: Slice the banana and add to the cooked oatmeal. Top with blueberries and a drizzle of honey for sweetness.",
          "3. Serve: Serve warm and enjoy as a hearty breakfast packed with fiber and vitamins."
        ], 
        image: "/src/assets/oatmeal.jpg", 
        overview: "Start your day with a warm and filling bowl of oatmeal topped with fresh fruits and a touch of honey for added sweetness." 
      },
      { 
        id: 4, 
        name: "Grilled Salmon", 
        ingredients: [
          "2 salmon fillets", 
          "Olive oil", 
          "Salt", 
          "Lemon slices", 
          "Fresh herbs like dill or parsley"
        ], 
        directions: [
          "1. Grill the salmon: Brush salmon fillets with olive oil and season with salt. Grill over medium heat for 6-7 minutes on each side or until the salmon is cooked through.",
          "2. Garnish: Top with fresh herbs and lemon slices before serving."
        ], 
        image: "/src/assets/grilled-salmon.jpg", 
        overview: "A healthy, savory grilled salmon dish rich in omega-3 fatty acids, perfect for a nutritious meal." 
      },
      { 
        id: 5, 
        name: "Vegetable Stir Fry", 
        ingredients: [
          "1 cup tofu", 
          "2 cups mixed vegetables (carrot, bell pepper, broccoli, etc.)", 
          "Soy sauce", 
          "1 tablespoon sesame oil", 
          "Garlic"
        ], 
        directions: [
          "1. Stir-fry tofu: In a hot pan, stir-fry tofu in sesame oil until golden brown. Remove from the pan and set aside.",
          "2. Cook the vegetables: In the same pan, add garlic and cook until fragrant. Add the mixed vegetables and stir-fry for 5-7 minutes.",
          "3. Combine: Return tofu to the pan, add soy sauce and stir everything together until the sauce is absorbed."
        ], 
        image: "/src/assets/stir-fry.jpg", 
        overview: "A colorful and tasty veggie stir fry loaded with vitamins and protein from tofu, making it a nutritious and satisfying meal." 
      },
      { 
        id: 6, 
        name: "Quinoa and Chicken Salad", 
        ingredients: [
          "1 cup quinoa", 
          "2 chicken breasts", 
          "1 cup mixed greens", 
          "1/4 cup feta cheese", 
          "1/4 cup walnuts", 
          "Olive oil", 
          "Lemon juice"
        ], 
        directions: [
          "1. Cook quinoa: Cook quinoa as per the instructions, then let it cool.",
          "2. Grill chicken: Season chicken breasts and grill until cooked through, then slice.",
          "3. Assemble the salad: In a large bowl, combine quinoa, mixed greens, chicken, feta cheese, and walnuts.",
          "4. Dress the salad: Drizzle with olive oil and lemon juice before serving."
        ], 
        image: "/src/assets/quinoa-chicken-salad.jpg", 
        overview: "A high-protein, nutrient-dense salad that's perfect for lunch or dinner, packed with protein from chicken and quinoa." 
      },
      { 
        id: 7, 
        name: "Beef Stew", 
        ingredients: [
          "1 lb beef", 
          "1 onion", 
          "3 cups beef broth", 
          "2 carrots", 
          "1 potato", 
          "2 tablespoons tomato paste"
        ], 
        directions: [
          "1. Brown the beef: In a large pot, brown the beef in olive oil until fully cooked.",
          "2. Add vegetables: Add diced onion, carrots, and potatoes, and cook until softened.",
          "3. Simmer the stew: Add beef broth, tomato paste, and simmer the stew for 45-60 minutes until thickened."
        ], 
        image: "/src/assets/beef-stew.jpg", 
        overview: "A warm and comforting stew, perfect for a hearty meal on a cold day." 
      },
      { 
        id: 8, 
        name: "Greek Yogurt Parfait", 
        ingredients: [
          "1 cup Greek yogurt", 
          "1/2 cup granola", 
          "1/2 cup mixed berries", 
          "Honey"
        ], 
        directions: [
          "1. Layer the ingredients: In a bowl or jar, layer Greek yogurt, granola, and mixed berries.",
          "2. Drizzle with honey: Top with a drizzle of honey for sweetness."
        ], 
        image: "/src/assets/greek-yogurt-parfait.jpg", 
        overview: "A refreshing and protein-packed dessert or snack, perfect for a light treat." 
      },
      { 
        id: 9, 
        name: "Chickpea Salad", 
        ingredients: [
          "1 can chickpeas", 
          "1 cucumber", 
          "1 red pepper", 
          "Olive oil", 
          "Lemon juice"
        ], 
        directions: [
          "1. Prepare the chickpeas: Drain and rinse the chickpeas.",
          "2. Chop the vegetables: Dice cucumber and red pepper.",
          "3. Assemble the salad: Mix chickpeas with veggies, and drizzle with olive oil and lemon juice."
        ], 
        image: "/src/assets/chickpea-salad.jpg", 
        overview: "A simple and nutritious salad with protein-rich chickpeas and fresh, crunchy vegetables." 
      },
      { 
        id: 10, 
        name: "Zucchini Noodles with Pesto", 
        ingredients: [
          "2 zucchinis", 
          "1/2 cup pesto", 
          "Parmesan cheese"
        ], 
        directions: [
          "1. Prepare the zucchini noodles: Spiralize the zucchini to create noodle-like strands.",
          "2. Toss with pesto: In a large bowl, toss zucchini noodles with pesto sauce.",
          "3. Garnish: Top with grated Parmesan cheese before serving."
        ], 
        image: "/src/assets/zucchini-noodles.jpg", 
        overview: "A low-carb, flavorful pasta alternative made with fresh zucchini noodles and delicious pesto." 
      }
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
          <p className="recipe-description">{recipe.overview}</p>
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
