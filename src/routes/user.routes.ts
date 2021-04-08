import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { UsersControllers } from "../controllers/User/UsersController";

export const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8),
      confirm_password: Joi.ref("password"),
    }),
  }),
  usersControllers.create
);
