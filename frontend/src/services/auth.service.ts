import { api } from "../lib/axios";
export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  name: string;
  email: string;
  role: "admin" | "user";
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);

  return response.data.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await api.post("/auth/refresh-token");

  return response.data.data;
};

export const getMe = async (): Promise<AuthResponse> => {
  const response = await api.get("/auth/me");

  return response.data.data;
};
