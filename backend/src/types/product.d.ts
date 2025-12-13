import { Document, ObjectId } from "mongoose";
import { User } from "./user";
import multer, { Multer } from "multer";
import { Request } from "express";

export interface Product extends Document {
  title: string;
  category: string;
  image?: string;
  description?: string;
  price: number;
  createdBy?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductRequest extends Request {
  user?: User;
  body: Product;
  file?: Express.Multer.File;
}
