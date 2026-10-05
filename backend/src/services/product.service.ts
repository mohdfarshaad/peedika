import { prisma } from "../prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const createProductService = async (data: {
  name: string;
  categoryId?: string;
  description?: string;
  price: number;
  stock: number;
}) => {
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      categoryId: data.categoryId,
      description: data.description,
      price: data.price,
      stock: data.stock,
    },
  });

  if (!product) {
    throw ApiError.internal("Product creation failed");
  }

  return product;
};

export const updateProductService = async (
  productId: string,
  data: {
    name?: string;
    categoryId?: string;
    description?: string;
    price?: number;
    stock?: number;
    status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  },
) => {
  const updateData: {
    name?: string;
    slug?: string;
    categoryId?: string;
    description?: string;
    price?: number;
    stock?: number;
    status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
    image?: string;
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = data.name.toLowerCase().trim().replace(/\s+/g, "-");
  }

  if (data.categoryId !== undefined) {
    updateData.categoryId = data.categoryId;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  if (data.price !== undefined) {
    updateData.price = data.price;
  }

  if (data.stock !== undefined) {
    updateData.stock = data.stock;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  try {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: updateData,
    });

    return product;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw ApiError.internal("Product not found");
    }

    throw error;
  }
};

export const deleteProductService = async (productId: string) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return product;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw ApiError.internal("Product not found");
    }

    throw error;
  }
};

export const getProductByIdService = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return product;
};

export const getAllProductsService = async () => {
  return await prisma.product.findMany();
};

export const getProductsByCategoryService = async (categoryId: string) => {
  return await prisma.product.findMany({
    where: {
      categoryId,
    },
  });
};
