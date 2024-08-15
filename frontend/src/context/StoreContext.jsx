import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets.js";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setfood_list] = useState([]);

  // setting up backend url to pass in context
  const url = "http://localhost:4000";

  // saving token
  const [token, setToken] = useState('');

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setfood_list(response.data.data);
  };

  const loadCartData = async (token) => {
    console.log(token)
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };


   useEffect(() => {
     fetchFoodList();
     if (localStorage.getItem("token")) {
       setToken(localStorage.getItem("token"));
       loadCartData(localStorage.getItem("token"));
     }
   }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setCartItems((prev) => {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      });
    }

    // integrates cart api with frontend
    // whatever item is updated in the cart, it will also be updated in the database
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    loadCartData,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
