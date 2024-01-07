import express from "express";
import dotenv from "dotenv";
import { HttpException } from "../exceptions/HttpException";

dotenv.config();

export const errorHandler = (
  err: HttpException,
  req: express.Request,
  res: express.Response
  // next: express.NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
