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

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 10;
      const userId = req.user?.id;

      const [refunds, total] = await Promise.all([
        prisma.refund.findMany({
          where: { userId },
          skip: (page - 1) * perPage,
          take: perPage,
          orderBy: { createdAt: "desc" },
        }),
        prisma.refund.count({
          where: { userId },
        }),
      ]);

      const totalPages = Math.ceil(total / perPage);

      res.json({
        currentPage: page,
        perPage,
        totalPages,
        totalItems: total,
        data: refunds,
      });
    } catch (error) {
      next(error);
    }
  };
}
