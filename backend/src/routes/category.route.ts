import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

// Public routes
categoryRouter.get("/", verifyJWT, getCategories);
categoryRouter.get("/slug/:slug", verifyJWT, getCategoryBySlug);
categoryRouter.get("/:id", verifyJWT, getCategoryById);

// Admin routes
categoryRouter.post("/", verifyJWT, createCategory);
categoryRouter.patch("/:id", verifyJWT, updateCategory);
categoryRouter.delete("/:id", verifyJWT, deleteCategory);

export default categoryRouter;
