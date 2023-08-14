import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongodb, { Timestamp } from "mongodb";
import asyncHandler from "express-async-handler";

dotenv.config();

/**
 * {
 *  id: string/number (autoincrement?)
 *  username: string
 *  email: string
 *  password: string
 *  movies: Array<string>
 * }
 */

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  res.status(201).json({
    username,
    email,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

export const loginUser = asyncHandler(async (req, res) => {});

export const getUser = asyncHandler(async (req, res) => {});
