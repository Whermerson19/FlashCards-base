import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function Authorization(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeaders = request.headers.authorization;
  if (!authHeaders) throw new AppError("JWT Token is missing");

  const [, token] = authHeaders.split(" ");

  const verifyToken = verify(token, authConfig.jwt.secret);
  if (!verifyToken) throw new AppError("Invalid token");

  const { sub } = verifyToken as IPayload;

  request.user = {
    id: sub,
  };

  next();
}
