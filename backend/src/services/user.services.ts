import bcrypt from "bcrypt";

import { prisma } from "../prisma.js";
import { UserRole } from "../generated/prisma/client.js";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      hashedPassword,
      role: userData.role
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const updateUserProfile = async (
  userId: number,
  data: {
    name?: string;
    avatar?: string;
  },
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      avatar: data.avatar,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      updatedAt: true,
    },
  });

  return user;
};

export const updateUserEmail = async (userId: number, email: string) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      updatedAt: true,
    },
  });

  return user;
};

export const updateUserPassword = async (userId: number, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedPassword,
      refreshToken: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
    },
  });

  return user;
};

export const deleteUser = async (userId: number) => {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};

export const getUser = async (params: { userId?: number; email?: string }) => {
  if (params.userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(params.userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  if (params.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  return null;
};

export const getAllUser = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
