import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionRoutes } from "./session-routes";
import { refundRoutes } from "./refund-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-Authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorizaation";

export const routes = Router();

routes.use("/users", ensureAuthenticated, verifyUserAuthorization, userRoutes);
routes.use(
  "/session",
  ensureAuthenticated,
  verifyUserAuthorization,
  sessionRoutes
);
routes.use(
  "refund",
  ensureAuthenticated,
  verifyUserAuthorization,
  refundRoutes
);
