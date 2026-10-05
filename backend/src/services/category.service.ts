import { prisma } from "../prisma.js";

export const createCategoryService = async (data: {
  name: string;
  description?: string;
}) => {
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: slug,
      description: data.description,
    },
  });

  return category;
};

export const getAllCategoriesService = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getCategoryByIdService = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
};

export const getCategoryBySlugService = async (slug: string) => {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  return category;
};

export const updateCategoryService = async (
  categoryId: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
  },
) => {
  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...data,
    },
  });

  return category;
};

export const deleteCategoryService = async (categoryId: string) => {
  const category = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return category;
};
