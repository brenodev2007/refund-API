import { Request, Response, NextFunction, request } from "express";
import { AppError } from "@/utils/AppError";

export function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!role.includes(req.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}
