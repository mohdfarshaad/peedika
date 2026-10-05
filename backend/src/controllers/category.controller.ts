import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  updateCategoryService,
} from "../services/category.service.js";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name) {
      throw ApiError.badRequest("Name is required");
    }

    const category = await createCategoryService({
      name,
      description,
    });

    res
      .status(201)
      .json(new ApiResponse(201, category, "Category created successfully"));
  },
);

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await getAllCategoriesService();

    res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories fetched successfully"),
      );
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
      throw ApiError.badRequest("Category ID is required");
    }

    const category = await getCategoryByIdService(String(categoryId));

    if (!category) {
      throw ApiError.notFound("Category not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched successfully"));
  },
);

export const getCategoryBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = req.params.slug;

    if (!slug) {
      throw ApiError.badRequest("Category slug is required");
    }

    const category = await getCategoryBySlugService(String(slug));

    if (!category) {
      throw ApiError.notFound("Category not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched successfully"));
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
      throw ApiError.badRequest("Category ID is required");
    }

    const { name, slug, description } = req.body;

    const category = await updateCategoryService(String(categoryId), {
      name,
      slug,
      description,
    });

    if (!category) {
      throw ApiError.notFound("Category not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category updated successfully"));
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
      throw ApiError.badRequest("Category ID is required");
    }

    const category = await deleteCategoryService(String(categoryId));

    if (!category) {
      throw ApiError.notFound("Category not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, category, "Category deleted successfully"));
  },
);
