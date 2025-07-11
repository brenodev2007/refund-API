import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "acommodation",
]);

export class RefundController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = z.object({
        name: z.string().trim(),
        category: CategoriesEnum,
        amount: z
          .number()
          .positive({ message: "o numero precisa ser positivo" }),
        filename: z.string(),
      });

      const { name, category, amount, filename } = bodySchema.parse(req.body);

      const refund = await prisma.refund.create({
        data: {
          name,
          category,
          amount,
          filename,
          userId: req.user?.id,
        },
      });

      res.json(refund);
    } catch (error) {
      next(error);
    }
  };
}
