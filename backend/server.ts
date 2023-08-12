import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

const db = await connectDB();

const arr = await db?.collection("users").find().toArray();

arr?.forEach((user) => console.log(user));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", (req, res) => {
//   res.send("yoo");
// });

app.use("/api/users", userRoutes);
// app.use("/api/lists");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
