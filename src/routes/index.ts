import { Router } from "express";

import { userRouter } from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);

export default appRouter;
