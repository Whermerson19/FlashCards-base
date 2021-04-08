import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { SessionController } from "../controllers/Session/SessionController";

export const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      loginField: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create
);
