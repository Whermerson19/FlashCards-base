import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ForgotPasswordController } from "../controllers/User/Passwords/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/User/Passwords/ResetPasswordController";

export const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  forgotPasswordController.create
);

passwordRouter.put(
  "/reset",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required().min(8),
    }),
  }),
  resetPasswordController.update
);
