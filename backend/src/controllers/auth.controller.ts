import { CookieOptions } from "express";
import {
  clearRefreshToken,
  generateTokens,
  getUserById,
  isExistingUser,
  isPasswordValid,
  refreshAccessToken,
  updateRefreshToken,
  verifyAccessToken,
} from "../services/auth.services.js";
import { createUser, getUser } from "../services/user.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthRequest } from "../types/user.js";
import { UserRole } from "../generated/prisma/client.js";
import { verify } from "crypto";

const isProd = process.env.NODE_ENV === "production";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  domain: isProd ? ".cohortorbit.zyverce.com" : undefined,
};

const cookieOptions = {
  ...baseCookieOptions,
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  } = req.body;

  if (!(name && email && password)) {
    throw ApiError.badRequest();
  }

  const isUserExists = await isExistingUser(email);

  if (isUserExists) {
    throw ApiError.conflict();
  }

  const defaultRole = role || UserRole.user;

  const createdUser = await createUser({
    name,
    email,
    password,
    role: defaultRole,
  });

  if (!createdUser) {
    throw ApiError.internal();
  }

  const userCreated = await getUser({
    userId: createdUser.id,
    email: createdUser.email,
  });

  if (!userCreated) {
    throw ApiError.internal();
  }

  const { accessToken, refreshToken } = await generateTokens(userCreated.id);

  if (!accessToken && !refreshToken) {
    throw ApiError.internal();
  }

  const data = {
    user: userCreated,
    tokens: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(new ApiResponse(201, data, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw ApiError.badRequest();
  }

  const isUserExists = await isExistingUser(email);

  if (!isUserExists) {
    throw ApiError.unauthorized();
  }

  const userId = isUserExists.id;

  const checkPassword = await isPasswordValid(userId, password);

  if (!checkPassword) {
    throw ApiError.badRequest("Invalid Password");
  }

  const { accessToken, refreshToken } = await generateTokens(userId);

  if (!accessToken && !refreshToken) {
    throw ApiError.internal();
  }

  await updateRefreshToken(userId, refreshToken);

  const user = {
    ...isUserExists,
    token: {
      accessToken,
      refreshToken,
    },
  };

  res
    .status(200)
    .cookie("AccessToken", accessToken, cookieOptions)
    .cookie("RefreshToken", refreshToken, refreshCookieOptions)
    .json(new ApiResponse(200, user, "User login successfully"));
});

export const getMe = asyncHandler(async (req: AuthRequest, res) => {
  const token = req.cookies.AccessToken;

  if (!token) {
    throw ApiError.unauthorized("No user found");
  }

  const validUser = verifyAccessToken(token);

  if (!validUser) {
    throw ApiError.unauthorized("No user found");
  }

  const userId = validUser._id;

  const user = await getUserById(userId);

  if (!user) {
    throw ApiError.unauthorized("No user found");
  }

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const logoutUser = asyncHandler(async (req: AuthRequest, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw ApiError.unauthorized();
  }

  const userlogout = await clearRefreshToken(userId);

  if (!userlogout) {
    throw ApiError.internal();
  }

  res
    .status(200)
    .clearCookie("AccessToken", cookieOptions)
    .clearCookie("RefreshToken", refreshCookieOptions)
    .json(new ApiResponse(200, userlogout, "User logged out"));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.RefreshToken;

  if (!incomingRefreshToken) {
    throw ApiError.unauthorized();
  }

  const { accessToken, refreshToken } = await refreshAccessToken(
    String(incomingRefreshToken),
  );

  res
    .status(200)
    .cookie("AccessToken", accessToken, baseCookieOptions)
    .cookie("RefreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed",
      ),
    );
});
