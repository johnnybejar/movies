import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongodb from "mongodb";
import asyncHandler from "express-async-handler";

dotenv.config();

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  res.status(201).json({
    username,
    email,
  });
});

export const loginUser = asyncHandler(async (req, res) => {});

export const getUser = asyncHandler(async (req, res) => {});
