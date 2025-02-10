import { ErrorRequestHandler } from "express";

import AppError from "../error/AppError";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Somthing went wrong.";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Somthing went wrong.",
    },
  ];

  if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [{ path: "", message: error?.message }];
  } else if (error instanceof Error) {
    message = error.issues[0].message;
    errorSources = [{ path: "", message: error?.message }];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources: errorSources,
    stack: process.env.NODE_ENV === "development" ? error?.stack : null,
    error: error,
  });
};

export default globalErrorHandler;
