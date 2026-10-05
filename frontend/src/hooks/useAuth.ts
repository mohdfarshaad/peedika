import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  type LoginData,
  type RegisterData,
} from "../services/auth.service";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getMe,
    retry: false,
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => registerUser(data),
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => loginUser(data),

    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: refreshToken,
  });

  return {
    user: meQuery.data,
    isLoadingUser: meQuery.isLoading,
    userError: meQuery.error,

    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refreshToken: refreshTokenMutation.mutateAsync,

    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,

    registerError: registerMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshTokenMutation.error,
  };
};
