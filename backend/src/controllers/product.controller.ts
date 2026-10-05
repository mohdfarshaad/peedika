import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  getProductsByCategoryService,
  updateProductService,
} from "../services/product.service.js";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, categoryId, description, price, stock } = req.body;

    if (!name || price === undefined || stock === undefined) {
      throw ApiError.badRequest("Name, price and stock are required");
    }

    const product = await createProductService({
      name,
      categoryId,
      description,
      price: Number(price),
      stock: Number(stock),
    });

    res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully"));
  },
);

export const updateProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
      throw ApiError.badRequest("Product ID is required");
    }

    const { name, categoryId, description, price, stock, status } = req.body;

    const product = await updateProductService(String(productId), {
      name,
      categoryId,
      description,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      status,
    });

    if (!product) {
      throw ApiError.notFound("Product not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  },
);

export const deleteProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
      throw ApiError.badRequest("Product ID is required");
    }

    const product = await deleteProductService(String(productId));

    if (!product) {
      throw ApiError.notFound("Product not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product deleted successfully"));
  },
);

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await getAllProductsService();

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
      throw ApiError.badRequest("Product ID is required");
    }

    const product = await getProductByIdService(String(productId));

    if (!product) {
      throw ApiError.notFound("Product not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  },
);

export const getProductByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
      throw ApiError.badRequest("Category ID is required");
    }

    const products = await getProductsByCategoryService(String(categoryId));

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          products,
          "Products by category fetched successfully",
        ),
      );
  },
);
