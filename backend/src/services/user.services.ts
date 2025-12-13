
import  UserModel  from "../models/user.model";
import { getUserParams, ICreateUser } from "../types/user";

export const createUser = async (userData: ICreateUser) => {
  return await UserModel.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
};

export const updateUserProfile = async () => {};

export const updateUserEmail = async () => {};
export const updateUserPassword = async () => {};

export const deleteUser = async (userId: string) => {
  return await UserModel.findByIdAndDelete(userId);
};

export const getUser = async (params: getUserParams) => {
  const query: any = {};
  if (params.userId) query._id = params.userId;
  if (params.email) query.email = params.email;
  return await UserModel.findOne(query).select("-password -refreshToken");
};

export const getAllUser = async () => {
  return await UserModel.find().select("-password -refreshToken");
};

