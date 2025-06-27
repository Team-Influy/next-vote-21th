import axios from "axios";
import { useAuthStore, getDecryptedRefreshToken } from "@/store/authStore";
import { authApi } from "./axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const postReissue = async (refreshToken: string) => {
  const response = await authApi.post("/users/reissue", { refreshToken });
  return response.data;
};
