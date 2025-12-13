import { Request, Response } from "express";
import { ProductRequest } from "../types/product";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import {
  AddProduct,
  deleteProduct,
  fetchAllProduct,
  fetchProduct,
  fetchProductByCategoryName,
  updateProduct,
} from "../services/product.service";
import { UploadApiResponse } from "cloudinary";
import { Types } from "mongoose";

export const createProduct = asyncHandler(
  async (req: ProductRequest, res: Response) => {
    const { title, category, description, price } = req.body;
    const file = req.file;

    if (!title && !category && !price && !file) {
      throw ApiError.badRequest();
    }

    const userId = req.user?._id;

    if (!userId) {
      throw ApiError.unauthorized();
    }

    const imageLocalPath = file?.path;

    const uploadImage = (await uploadOnCloudinary(
      imageLocalPath
    )) as UploadApiResponse;

    if (!uploadImage) {
      throw ApiError.internal("Image upload failed");
    }

    const imageUrl = uploadImage.url;

    const uploadProduct = await AddProduct(
      {
        title,
        category,
        description,
        price,
      },
      userId,
      imageUrl
    );

    if (!uploadProduct) {
      throw ApiError.internal();
    }

    res.status(200).json(new ApiResponse(201, uploadProduct, ""));
  }
);

export const updateProductById = asyncHandler(
  async (req: ProductRequest, res: Response) => {
    const productId = Object(req.params.id.replace(":", ""));
    const { title, category, description, price } = req.body;
    const file = req.file;

    if (!title && !category && !price && !file) {
      throw ApiError.badRequest();
    }

    const imageLocalPath = file?.path;

    const uploadImage = (await uploadOnCloudinary(
      imageLocalPath
    )) as UploadApiResponse;

    if (!uploadImage) {
      throw ApiError.internal();
    }

    const imageUrl = uploadImage.url;

    const updatedProduct = await updateProduct(
      {
        title,
        description,
        category,
        price,
      },
      productId,
      imageUrl
    );

    if (!updateProduct) {
      throw ApiError.internal();
    }

    res
      .status(201)
      .json(
        new ApiResponse(201, updatedProduct, "Product updated successfully")
      );
  }
);

export const deleteProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
      throw ApiError.accessDenied();
    }

    const deletedProduct = await deleteProduct(productId);

    if (!deleteProduct) {
      throw ApiError.internal();
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, deletedProduct, "Product deleted successfully")
      );
  }
);

export const getProducts = asyncHandler(
  async (req: ProductRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      throw ApiError.unauthorized();
    }

    const products = await fetchAllProduct();

    if (!products) {
      throw ApiError.internal();
    }

    res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  }
);

export const getProductById = asyncHandler(
  async (req: ProductRequest, res: Response) => {
    const id = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      throw ApiError.unauthorized();
    }

    if (!id || !Types.ObjectId.isValid(id)) {
      throw ApiError.accessDenied();
    }

    const product = await fetchProduct(new Types.ObjectId(id));

    if (!product) {
      throw ApiError.internal();
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, product, "Product by id fetched successfully")
      );
  }
);

export const getProductByCategory = asyncHandler(
  async (req: ProductRequest, res: Response) => {
    const userId = req.user?._id;
    const category = req.params.category;

    if (!userId) {
      throw ApiError.unauthorized();
    }
    if (!category) {
      throw ApiError.badRequest();
    }

    const products = await fetchProductByCategoryName(category);

    if (!products) {
      throw ApiError.internal();
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          products,
          "Products by category fetched successfully "
        )
      );
  }
);
