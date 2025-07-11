import { Router } from "express";

import { UsersController } from "@/controllers/UsersController";

export const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post("/create", usersController.create);
