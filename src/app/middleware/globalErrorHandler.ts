import { ErrorRequestHandler } from "express";

import { ZodError } from "zod";
import AppError from "../error/AppError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import handleValidationError from "../error/handleValidationError";
import handleZodError from "../error/handleZodError";
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

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error.name == "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error.code == "11000") {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [{ path: "", message: error?.message }];
  } else if (error instanceof Error) {
    message = error.message;
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
