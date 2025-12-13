import { verify } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { config } from "../config";
import { decodedToken } from "../middlewares/auth.middleware";
import UserModel from "../models/user.model";

export const isExistingUser = async (email: string) => {
  return await UserModel.findOne({ email }).select("-password -refreshToken");
};

export const generateTokens = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw ApiError.unauthorized();
  }

  const accessToken = await user?.generateAccessToken();
  const refreshToken = await user?.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
};

export const isPasswordValid = async (userId: string, password: string) => {
  const user = await UserModel.findById(userId);
  return await user?.isPasswordCorrect(password);
};

export const clearRefreshToken = async (userId: {}) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: null },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
};

export const refreshAccessToken = async (incomingRefreshToken: any) => {
  const decodedToken = verify(
    incomingRefreshToken,
    config.REFRESH_TOKEN_SECRET
  ) as decodedToken;

  const userId = decodedToken?._id;

  return await generateTokens(userId);
};
