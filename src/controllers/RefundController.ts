import { Request, Response, NextFunction } from "express";

export class RefundController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
