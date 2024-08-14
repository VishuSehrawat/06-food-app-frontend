import React, { useState } from "react";
import "./Add.css";
import { assets, food_list } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
 
  
  
  const [foodImage, setfoodImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
 

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", foodImage);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      toast.success(response.data.message);
    } else {
      setfoodImage(false);
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form onSubmit={(e) => onSubmitHandler(e)} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                foodImage ? URL.createObjectURL(foodImage) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              console.log(e.target.files);
              foodImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={(e) => {
              onChangeHandler(e);
            }}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={(e) => {
              onChangeHandler(e);
            }}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={(e) => {
                onChangeHandler(e);
              }}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={(e) => {
                onChangeHandler(e);
              }}
              value={data.price}
              type="Number"
              name="price"
              placeholder="20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
 
      </form>
    </div>
  );
};

export default Add;
