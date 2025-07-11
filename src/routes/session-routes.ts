import { Router } from "express";

import { SessionController } from "@/controllers/SessionController";

export const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post("/", sessionController.create);
