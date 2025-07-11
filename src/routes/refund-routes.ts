import { Router } from "express";

import { RefundController } from "@/controllers/RefundController";

export const refundRoutes = Router();

const refundController = new RefundController();

refundRoutes.post("/create", refundController.create);
