import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CardsController } from "../controllers/Card/CardsController";
import { ListAllCardsController } from "../controllers/Card/ListAllCardsController";
import { Authorization } from "../middlewares/Authorization";

export const cardRouter = Router();

const cardsController = new CardsController();
const listAllCardsController = new ListAllCardsController();

cardRouter.use(Authorization);

cardRouter.get("/list/:listId/page/:page", cardsController.index);

cardRouter.get("/", listAllCardsController.index);

cardRouter.post(
  "/list/:listId",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      front: Joi.string().required().max(200),
      versus: Joi.string().required().max(200),
    }),
  }),
  cardsController.create
);

cardRouter.put(
  "/id/:cardId",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      front: Joi.string().required().max(200),
      versus: Joi.string().required().max(200),
    }),
  }),
  cardsController.update
);

cardRouter.delete("/id/:cardId", cardsController.delete);
