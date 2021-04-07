import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import { AppError } from "./errors/AppError";
import appRouter from "./routes";

import "./database";

const app = express();
app.use(express.json());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
);

app.use(appRouter);
