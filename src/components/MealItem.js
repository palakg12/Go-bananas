import React from "react"; // Importing the React library
import './style.css'; // Importing the stylesheet for the component

// Defining a functional component named MealItem
const MealItem = ({ data, onClick }) => {
  // Returning the JSX for the component
  return (
    // A div element with a class of "card" that responds to click events
    <div className="card" onClick={onClick}>
      
      <img src={data.strMealThumb} alt={data.strMeal} />
      
      
      <p>{data.strInstructions.substring(0, 100)}...</p>
     
    </div>
  );
};

// Exporting the MealItem component as the default export
export default MealItem;