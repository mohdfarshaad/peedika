import mongoose, { Schema } from "mongoose";
import { Product } from "../types/product";

const productSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Image is Required"],
    },

    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
