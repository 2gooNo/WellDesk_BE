import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { userRouter } from "./routes/user-routes.js";
// import { quizRouter } from "./routes/quiz-routes.js";
// import { catRouter } from "./routes/category-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/", userRouter);
// app.use("/", quizRouter);
// app.use("/", catRouter);
// const connectDb = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://iveelturu:iveel0131@iveel.embu1nk.mongodb.net/"
//     );
//     console.log("All Database Connected");
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//   }
// };
// connectDb();

app.listen(8000, () => {
  console.log("http://localhost:8000/");
});