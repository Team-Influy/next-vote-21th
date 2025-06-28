"use client";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/postLogin";
import { useAuthStore, getRefreshTokenFromStorage } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/app/types/login.types";
import { useState } from "react";
import { postReissue } from "@/api/postReissue";

export const useLogin = () => {
  const { setAccessToken, setRefreshToken, setUserName } = useAuthStore();
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation<
    LoginResponse,
    Error,
    {
      email: string;
      password: string;
    }
  >({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setAccessToken(data.result.accessToken);
      setRefreshToken(data.result.refreshToken);
      setUserName(data.result.name);

      router.push("/");
    },
    onError: () => {
      setErrors({
        email: "로그인 정보를 확인해주세요.",
        password: "로그인 정보를 확인해주세요.",
      });
    },
  });

  return {
    ...mutation,
    errors,
    setErrors,
  };
};

export const useReissueToken = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshTokenFromStorage();

      if (!refreshToken) {
        console.warn("No refresh token found");
        useAuthStore.getState().logout();
        return;
      }

      const data = await postReissue(refreshToken);

      const { accessToken, refreshToken: newRefreshToken } = data.result;

      useAuthStore.getState().setAccessToken(accessToken);
      useAuthStore.getState().setRefreshToken(newRefreshToken);

      return accessToken;
    },

    onError: (error) => {
      console.error("❌ 토큰 재발급 실패", error);
      useAuthStore.getState().logout();
      window.location.href = "/login";
    },
  });
};
