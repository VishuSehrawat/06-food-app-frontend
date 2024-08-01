import React from "react";
import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate()

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price * 86}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id] * 86}</p>
                  <p
                    className="cross"
                    onClick={() => {
                      removeFromCart(item._id);
                    }}
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount() * 86}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹ {200}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount()*86+200}</b>
          </div>
          <hr />
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
