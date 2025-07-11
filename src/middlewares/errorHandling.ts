import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    res.status(400).json({ message: error.issues[0].message });
  }

  res.status(500).json({ message: "Internal Server Error" });
}
