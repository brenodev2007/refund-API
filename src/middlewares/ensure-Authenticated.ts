import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token inválido", 401);
    }

    const [, token] = authHeader.split("");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    next(error);
  }
}
