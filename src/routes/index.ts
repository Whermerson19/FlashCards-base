import { Router } from "express";

import { userRouter } from "./user.routes";
import { sessionRouter } from "./session.routes";
import { listRouter } from "./list.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/list", listRouter);

export default appRouter;
