import React,{useContext} from "react";
import "./FoodItem.css";
import {assets} from  '../../assets/assets.js'
import {StoreContext} from '../../context/StoreContext'

const FoodItem = ({ item }) => {
  const{cartItems,setCartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
  const { _id, name, price, description, image } = item;

  return (
    <div key={_id} className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />

        {cartItems[_id] ? (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(_id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        ) : (
          <div>
            <img
              className="add"
              onClick={() => addToCart(_id)}
              src={assets.add_icon_white}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <div className="food-item-desc">{description}</div>
        <div className="food-item-price">₹{price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
