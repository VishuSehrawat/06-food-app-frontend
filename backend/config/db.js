import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vishuSehrawat:Vishu_Sehrawat7705@cluster0.r0yq5uh.mongodb.net/food-del"
    )
    .then(() => {




      
      console.log("mongoose connected");
    });
};

 