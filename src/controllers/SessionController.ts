import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export class SessionController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = z.object({
        email: z.string().email({ message: "o email é obrigatório" }),
        password: z.string(),
      });

      const { email, password } = bodySchema.parse(req.body);

      res.json({ email, password });
    } catch (error) {
      next(error);
    }
  };
}
