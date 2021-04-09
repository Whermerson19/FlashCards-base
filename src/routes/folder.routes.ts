import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { FoldersController } from "../controllers/Folder/FoldersController";
import { Authorization } from "../middlewares/Authorization";

export const folderRouter = Router();
const foldersController = new FoldersController();

folderRouter.use(Authorization);

folderRouter.get("/", foldersController.index);

folderRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required().max(20),
    },
  }),
  foldersController.create
);

folderRouter.put(
  "/:folderId",
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required().max(20),
    },
  }),
  foldersController.update
);
