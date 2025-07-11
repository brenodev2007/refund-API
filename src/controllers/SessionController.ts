import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";

export class SessionController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = z.object({
        email: z.string().email({ message: "o email é obrigatório" }),
        password: z.string(),
      });

      const { email, password } = bodySchema.parse(req.body);

      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        throw new AppError("email ou senha incorreta", 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new AppError("Email ou senha inválido", 401);
      }

      res.json({ email, password });
    } catch (error) {
      next(error);
    }
  };
}
