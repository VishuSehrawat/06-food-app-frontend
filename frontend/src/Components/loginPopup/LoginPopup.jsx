import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken,loadCartData}= useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up");

  // to save user's name,email and password
  const [data, setData] = useState({
    name: '',
    email: '',
    password:''
  })

  const onLogin = async (e) => {
    e.preventDefault()
    let newUrl = url
    
    if (currState === 'Sign Up') {
      newUrl += "/api/user/register"
      console.log(newUrl)
    }
    else {
      newUrl += "/api/user/login";
      console.log(newUrl);

    }

    const response = await axios.post(newUrl,data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      // loadCartData(response.data.token)
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }

  
  // function to take data from input field and save in data state
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    
    setData(data=>({...data,[name]:value}))
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => {
                setCurrState("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span
              onClick={() => {
                setCurrState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
