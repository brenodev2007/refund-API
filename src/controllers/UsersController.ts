import { Request, Response, NextFunction } from "express";
import { UserRole } from "@/generated/prisma";
import { z } from "zod";
import { prisma } from "@/database/prisma";

export class UsersController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(2, { message: "Nome é obrigatório " }),
        email: z.string().trim().toLowerCase(),
        password: z.string().min(6),
        role: z
          .enum([UserRole.employee, UserRole.manager])
          .default(UserRole.employee),
      });

      const { name, email, password, role } = bodySchema.parse(req.body);
      res.json({ name, email, password, role });
    } catch (error) {
      next(error);
    }
  };
}
