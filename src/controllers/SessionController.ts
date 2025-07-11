import { Request, Response, NextFunction } from "express";

export class SessionController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
