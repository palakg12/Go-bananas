import React, { useState, useEffect } from "react"; // Importing React and its hooks
import { FaHeart } from "react-icons/fa"; // Importing the FaHeart icon
import MealItem from "./MealItem"; // Importing the MealItem component
import MealDetail from "./MealDetail"; // Importing the MealDetail component
import './style.css'; // Importing the stylesheet

// Defining the CombinedMeals component
const CombinedMeals = () => {
  // Initializing state variables using the useState hook
  const [search, setSearch] = useState(""); // Search input value
  const [meals, setMeals] = useState([]); // Array of random meals
  const [searchResults, setSearchResults] = useState(null); // Search results
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal for detail view

  // Using the useEffect hook to fetch random meals on component mount
  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        // Fetching random meals from the API
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        setMeals(data.meals); // Updating the meals state
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchRandomMeals();
  }, []);

  // Defining a function to handle search input
  const searchMeal = (evt) => {
    if (evt.key === "Enter") {
      // Fetching search results from the API
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.meals); // Updating the search results state
          setSearch(""); // Clearing the search input
        });
    }
  };

  // Defining a function to open the meal detail view
  const openMealDetail = (meal) => {
    setSelectedMeal(meal);
  };

  // Defining a function to close the meal detail view
  const closeMealDetail = () => {
    setSelectedMeal(null);
  };

  // Returning the JSX for the component
  return (
    <div className="main">
      <div className="heading">
        <h1>Search Your Food Recipe</h1>
      </div>
      <div className="searchBox">
        <input
          type="search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={searchMeal}
        />
      </div>
      <div className="container">
        {searchResults ? (
          // Displaying search results
          searchResults.map((res) => (
            <MealItem key={res.idMeal} data={res} onClick={() => openMealDetail(res)} />
          ) )
        ) : (
          // Displaying random meals
          <>
            <h2>Random Meals</h2>
            {meals.map(meal => (
              <div key={meal.idMeal} className="meal" onClick={() => openMealDetail(meal)}>
                <div className="meal-header">
                  <span className="random"> Random Recipe </span>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="mealimg" />
                </div>
                </div>
    
            ))}
          </>
        )}
      </div>
      {selectedMeal && <MealDetail meal={selectedMeal} onClose={closeMealDetail} />}
    </div>
  );
};

export default CombinedMeals;