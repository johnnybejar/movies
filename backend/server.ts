import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

const db = await connectDB();

const arr = await db?.collection("users").find().toArray();

arr?.forEach((user) => console.log(user));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/", (req, res) => {
  res.send("yoo");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
