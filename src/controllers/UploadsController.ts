import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export class UploadsController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileSchema = z.object({
        filename: z.string().min(1),
        mimetype: z.string(),
        size: z.number().positive(),
      });

      const { filename, mimetype, size } = fileSchema.parse(req.file);
      res.json();
    } catch (error) {
      next(error);
    }
  };
}
