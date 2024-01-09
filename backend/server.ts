import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import listRoutes from "./routes/listRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const db = await connectDB();

if (!db) {
  throw new Error("Cannot connect to database!");
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/lists", listRoutes);

// Serves the client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Not set to production"));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
