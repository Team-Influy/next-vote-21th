import { getAuthApi } from "./axiosInstance";
import { LoginResponse } from "@/app/types/login.types";

export const postLogin = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await getAuthApi().post("/users/sign-in", data);
  console.log("refreshToken", response.data.result.refreshToken);
  return response.data;
};
