import React from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food_display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return <FoodItem item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
