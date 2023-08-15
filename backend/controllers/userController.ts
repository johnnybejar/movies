import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongodb, { ObjectId, Timestamp } from "mongodb";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import connectDB from "../config/db";

dotenv.config();

/**
 * {
 *  id: string/number (autoincrement?)
 *  username: string
 *  email: string
 *  password: string
 * }
 */
const db = await connectDB();
const listCollection = db?.collection("users");

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user is already registered
  const userExists = await listCollection.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  console.log(userExists);

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userDoc = {
    username,
    email,
    password: hashedPassword,
  };

  const result = await listCollection.insertOne(userDoc);

  res.status(201).json({
    username,
    email,
    createdAt: new Date(),
    token: generateToken(result.insertedId),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await listCollection.findOne({ email: email });

  // Check for user password
  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate a JWT for the session
let generateToken = (id: ObjectId) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  } else {
    throw new Error("JWT secret is not defined...");
  }
};
