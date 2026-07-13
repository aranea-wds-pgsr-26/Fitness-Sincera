import { ErrorRequestHandler } from "express";
import { AppError } from "../shared/errors/AppError";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};