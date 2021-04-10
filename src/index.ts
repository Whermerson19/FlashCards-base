import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import { errors } from "celebrate";
import { AppError } from "./errors/AppError";
import appRouter from "./routes";
import uploadConfig from "./config/upload";
import "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.uploadFolder));

app.use(appRouter);
app.use(errors());
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

app.listen(3333, () => console.log("server isRunning"));
