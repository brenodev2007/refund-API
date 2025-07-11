import { Router } from "express";

import { RefundController } from "@/controllers/RefundController";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorizaation";

export const refundRoutes = Router();

const refundController = new RefundController();

refundRoutes.post(
  "/create",
  verifyUserAuthorization(["employee"]),
  refundController.create
);
refundRoutes.get(
  "/",
  verifyUserAuthorization(["employee"]),
  refundController.index
);
refundRoutes.get(
  "/:id",
  verifyUserAuthorization(["employee"]),
  refundController.show
);
