import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../prisma.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const { JsonWebTokenError } = jwt;

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(ApiError.unauthorized("No Token found"));
    }

    const decodedToken = jwt.verify(token, ACCESS_SECRET) as JwtPayload;


    const user = await prisma.user.findUnique({
      where: { id: decodedToken._id },
    });

    if (!user) {
      return next(ApiError.unauthorized("Invalid Token: no user found"));
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      hashedPassword: user.hashedPassword,
      refreshToken: user.refreshToken,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar ?? null,
    };
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      return next(
        ApiError.unauthorized(error?.message || "Invalid Access Token"),
      );
    else {
      console.error(error);
    }
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (role === "admin") {
    next();
  } else {
    return next(ApiError.accessDenied());
  }
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  const role = req.user?.role;
  if (role === "user") {
    next();
  } else {
    return next(ApiError.accessDenied());
  }
};
