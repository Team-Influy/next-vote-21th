import { ACCESS_TOKEN_KEY } from "@/constants/api";
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

// const getRefreshToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   }
//   return null;
// };

const createAxiosInstance = (): AxiosInstance => {
  const axiosInstace = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10초 기다려도 응답 없으면 타임아웃
    headers: {
      Authorization: getAccessToken()
        ? `Bearer ${getAccessToken()}`
        : undefined,
    },
  });
  // 토큰 리프레시 요청
  // axiosInstace.interceptors.request.use(

  // )
  return axiosInstace;
};

export const authApi = createAxiosInstance();
