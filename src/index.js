import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user-routes.js";
// import { quizRouter } from "./routes/quiz-routes.js";
// import { catRouter } from "./routes/category-routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);
// app.use("/", quizRouter);
// app.use("/", catRouter);
const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("All Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

connectDb();

app.listen(8000, () => {
  console.log("http://localhost:8000/");
});