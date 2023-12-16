import express from "express";
// import dotenv from "dotenv";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import connectDB from "../config/db";
import { ObjectId } from "mongodb";

dotenv.config();

interface JwtPayload {
  id: string;
}

const db = await connectDB();
const listCollection = db?.collection("users");

export const protect = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      process.env.JWT_SECRET
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        // Get user from the token
        const doc = await listCollection.findOne({
          _id: new ObjectId(decoded.id),
        });

        req.user = doc as Object;

        delete req.user.password;

        next();
      } catch (e) {
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
