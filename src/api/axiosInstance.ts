import axios, { AxiosInstance } from "axios";
import { useAuthStore, getRefreshTokenFromStorage } from "@/store/authStore";
import { postReissue } from "./postReissue";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let authApi: AxiosInstance | null = null;

function getAuthApi() {
  if (authApi) return authApi;
  authApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });

  // 요청 인터셉터: zustand에서 accessToken을 동적으로 읽어 헤더에 주입
  authApi.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // 응답 인터셉터: 401 발생 시 refreshToken으로 재발급 시도
  authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        typeof window !== "undefined"
      ) {
        originalRequest._retry = true;
        const { setAccessToken, setRefreshToken, logout, setUserName } =
          useAuthStore.getState();
        const refreshToken = getRefreshTokenFromStorage();
        if (refreshToken) {
          try {
            const reissueRes = await postReissue(refreshToken);
            const { accessToken, refreshToken: newRefreshToken } =
              reissueRes.result;
            setAccessToken(accessToken);
            setRefreshToken(newRefreshToken);
            // 기존 요청에 새 accessToken 적용 후 재시도
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return authApi!(originalRequest);
          } catch (e) {
            logout();
          }
        } else {
          logout();
        }
      }
      return Promise.reject(error);
    },
  );

  return authApi;
}

export { getAuthApi };
