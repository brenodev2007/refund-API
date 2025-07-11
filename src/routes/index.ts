import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionRoutes } from "./session-routes";
import { refundRoutes } from "./refund-routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("refund", refundRoutes);
