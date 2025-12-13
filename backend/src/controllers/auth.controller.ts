import { CookieOptions } from "express";
import {
  clearRefreshToken,
  generateTokens,
  isExistingUser,
  isPasswordValid,
  refreshAccessToken,
} from "../services/auth.services";
import { createUser, getUser } from "../services/user.services";
import { AuthRequest, ICreateUser } from "../types/user";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password }: ICreateUser = req.body;

  if (!(name && email && password)) {
    throw ApiError.badRequest();
  }

  const isUserExists = await isExistingUser(email);

  if (isUserExists) {
    throw ApiError.conflict();
  }

  const createdUser = await createUser({ name, email, password });

  if (!createdUser) {
    throw ApiError.internal();
  }

  const userCreated = await getUser({ email });

  if (!userCreated) {
    throw ApiError.internal();
  }

  res
    .status(201)
    .json(new ApiResponse(201, userCreated, "User registered successfully"));
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

  const userId = isUserExists._id as string;

  const checkPassword = await isPasswordValid(userId, password);

  if (!checkPassword) {
    throw ApiError.badRequest("Invalid Password");
  }

  const { accessToken, refreshToken } = await generateTokens(userId);

  if (!accessToken && !refreshToken) {
    throw ApiError.internal();
  }

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new ApiResponse(200, isUserExists, "User login successfully"));
});

export const logoutUser = asyncHandler(async (req: AuthRequest, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw ApiError.unauthorized();
  }

  const userlogout = await clearRefreshToken(userId);

  if (!userlogout) {
    throw ApiError.internal();
  }

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, userlogout, "User logged out"));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.RefreshToken | req.body.RefreshToken;

  console.log(incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw ApiError.unauthorized();
  }

  const { accessToken, refreshToken } = await refreshAccessToken(
    incomingRefreshToken
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});
