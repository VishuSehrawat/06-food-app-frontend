import orderModel from "../models/orderModel.js";
import userModel from "../models/orderModel.js";
import Stripe from "stripe";

// console.log(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId, //from middleware
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    //   creating stripe payment logic
    //   line_items--> data related to product being purchased
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    //   creating session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment", //one time payment
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // session url is the unique url that directs the customer to the stripe checkout page to complete the payment
    // customer gets redirected to the session url when PAY is clicked on frontend
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  console.log(orderId, success);

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `${error}` });
  }
};

export { placeOrder, verifyOrder, userOrders };
