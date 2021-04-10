import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { Joi, Segments, celebrate } from "celebrate";

import { UsersControllers } from "../controllers/User/UsersController";
import { Authorization } from "../middlewares/Authorization";
import { UpdateAvatarController } from "../controllers/User/UpdateAvatarController";

export const userRouter = Router();

const upload = multer(uploadConfig);

const usersControllers = new UsersControllers();
const updateAvatarController = new UpdateAvatarController();

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

userRouter.put(
  "/",
  Authorization,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      currentPassword: Joi.string(),
      changedPassword: Joi.string().min(8),
      confirmChangedPassword: Joi.ref("changedPassword"),
    }),
  }),
  usersControllers.update
);

userRouter.patch(
  "/avatar",
  Authorization,
  upload.single("avatar"),
  updateAvatarController.update
);
