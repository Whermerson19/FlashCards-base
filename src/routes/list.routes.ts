import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { Authorization } from "../middlewares/Authorization";
import { ListController } from "../controllers/List/ListController";

export const listRouter = Router();
const listController = new ListController();

listRouter.use(Authorization);

listRouter.get("/", listController.index);

listRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
    }),
  }),
  listController.create
);

listRouter.put(
  "/:listId",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
    }),
  }),
  listController.update
);

listRouter.delete("/:listId", listController.delete);
