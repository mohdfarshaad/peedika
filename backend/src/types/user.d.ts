import { Request } from "express";
import mongoose, { Document, ObjectId } from "mongoose";
import { Product } from "./product";

export interface User extends Document {
  name: string;
  avatar?: string;
  email: string;
  password: string;
  role: string = "admin" | "user";
  refreshToken?: string | undefined;
  cart: [IProduct];
  createdAt?: Date;
  upatedAt?: Date;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
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
