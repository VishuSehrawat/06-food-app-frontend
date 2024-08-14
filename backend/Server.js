import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

connectDB();

// api endpoints
app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use('/api/user', userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order", orderRouter);


app.listen(port, () => {
  console.log("server is running on port ", port);
});

app.get("/", (req, res) => {
  res.send("server is running");
});
