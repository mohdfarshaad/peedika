import { Request } from "express";
import mongoose, { Document, ObjectId } from "mongoose";
import { Product } from "./product";

export interface User {
  name: string;
  avatar?: string;
  email: string;
  hashedPassword: string;
  role: string = "admin" | "user";
  refreshToken?: string | undefined;
  createdAt?: Date;
  upatedAt?: Date;
}

export interface AccessTokenPayload {
  _id: string | unknown;
  name: string;
  email: string;
}

export interface RefreshTokenPayload {
  _id: mongoose.Types.ObjectId | unknown;
}

export interface AuthRequest extends Request {
  user?: IUser;
  cookie?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface getUserParams {
  userId?: ObjectId;
  email?: string;
}
