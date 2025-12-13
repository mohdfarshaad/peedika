import { NextFunction, Request, Response } from "express";
import { User } from "../types/user";
import { ApiError } from "../utils/ApiError";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { config } from "../config";
import UserModel from "../models/user.model";

interface JWTVerificationRequest extends Request {
  user?: User;
  cookies: {
    AccessToken: any;
    RefreshToken: any;
  };
}

export interface decodedToken {
  _id: string;
}

export async function verifyJWT(
  req: JWTVerificationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw ApiError.unauthorized();
    }

    const decodedToken = jwt.verify(
      token,
      config.ACCESS_TOKEN_SECRET
    ) as decodedToken;
    const user = await UserModel.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw ApiError.unauthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      throw new ApiError(401, error?.message || "Invalid Access Token");
    else {
      console.error(error);
    }
  }
}

export const isAdmin = (
  req: JWTVerificationRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.user?.role;
  if (role === "admin") {
    next();
  } else {
    throw ApiError.accessDenied();
  }
};
