import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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
