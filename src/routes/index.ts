import { Router } from "express";

import { userRouter } from "./user.routes";
import { sessionRouter } from "./session.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);

export default appRouter;
