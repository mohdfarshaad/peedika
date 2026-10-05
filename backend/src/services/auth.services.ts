import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";
import { config } from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

type decodedToken = {
  _id: string;
};

const { sign, verify } = jwt;

export const isExistingUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
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

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

const generateAccessToken = (userId: number) => {
  return sign(
    {
      _id: userId,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

const generateRefreshToken = (userId: number) => {
  return sign(
    {
      _id: userId,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const generateTokens = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw ApiError.unauthorized();
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken,
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const isPasswordValid = async (userId: number, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      hashedPassword: true,
    },
  });

  if (!user) {
    return false;
  }

  return await bcrypt.compare(password, user.hashedPassword);
};

export const updateRefreshToken = async (
  userId: number,
  refreshToken: string,
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: refreshToken },
  });

  if (!user) {
    ApiError.internal();
  }

  return true;
};

export const clearRefreshToken = async (userId: number) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      refreshToken: true,
    },
  });

  return user;
};

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}

export const refreshAccessToken = async (incomingRefreshToken: string) => {
  const decoded = verify(
    incomingRefreshToken,
    config.REFRESH_TOKEN_SECRET,
  ) as decodedToken;

  const userId = decoded._id;

  return await generateTokens(Number(userId));
};
