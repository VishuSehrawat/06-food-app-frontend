import express from "express";
import cors from "cors";
import {connectDB} from './config/db.js'
import foodRoute from "./routes/foodRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images',express.static('uploads'))
const port = 4000;
connectDB()
// api endpoint
app.use('/api/food', foodRoute)



app.listen(port, () => {
  console.log("server is running on port ", port);
});

app.get("/", (req, res) => {
  res.send("server is running");
});
