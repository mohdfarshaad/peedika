import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  deleteProductById,
  getProductByCategory,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller.js";

export const productRouter = Router();

//Admin only routes
productRouter
  .route("/")
  .post(upload.single("image"), verifyJWT, isAdmin, createProduct);
productRouter
  .route("/:id")
  .put(upload.single("image"), verifyJWT, isAdmin, updateProductById);
productRouter.route("/:id").delete(verifyJWT, isAdmin, deleteProductById);

// User only routes
productRouter.route("/").get(verifyJWT, getProducts);
productRouter.route("/:id").get(verifyJWT, getProductById);
productRouter.route("/category/:id").get(verifyJWT, getProductByCategory);
