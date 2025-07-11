import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionRoutes } from "./session-routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
