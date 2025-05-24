import { authApi } from "./axiosInstance";
import { LoginResponse } from "@/app/types/login.types";

export const postLogin = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await authApi.post("/users/sign-in", data);
  return response.data;
};
