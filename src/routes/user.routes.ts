import { Router } from "express";

import { UsersControllers } from "../controllers/User/UsersController";

export const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.post("/", usersControllers.create);
