import React from "react"; // Importing React
import './style.css'; // Importing the stylesheet

// Defining the MealDetail component that accepts meal and onClose props
const MealDetail = ({ meal, onClose }) => {
  // Initializing an empty array to store ingredients
  const ingredients = [];

  // Looping through the meal object to extract ingredients
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      // Pushing the ingredient and its measure to the ingredients array
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      // Breaking the loop if no more ingredients are found
      break;
    }
  }

  // Returning the JSX for the component
  return (
    <div className="meal-popup">
      <div className="meal-info">
        // A button to close the meal detail popup
        <button className="close-btn" onClick={onClose}>Close</button>
        // Displaying the meal name
        <h1>{meal.strMeal}</h1>
        // Displaying the meal thumbnail
        <img src={meal.strMealThumb} alt={meal.strMeal} className="mealimg"/>
        // Displaying the meal instructions
        <p>{meal.strInstructions}</p>
        // Displaying the ingredients
        <h3 >Ingredients:</h3>
        <ul>
          {ingredients.map((ing, index) => (
            // Listing each ingredient with its measure
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Exporting the MealDetail component as the default export
export default MealDetail;
