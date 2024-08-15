import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(url + "/api/order/list");

    if (response.data.success) {
      setOrders(response.data.data);
      console.log(orders);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3>Orders Page</h3>

      <div className="order-list">
        {orders.map((order, index) => {
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {})}
              </p>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Orders;
