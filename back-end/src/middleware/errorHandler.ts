import { ErrorRequestHandler } from "express";
import { AppError } from "../shared/errors/AppError";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      requestId: req.requestId,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
    requestId: req.requestId,
  });
};
