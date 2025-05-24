import { RegisterResponse } from "@/app/\btypes/register.types";
import { authApi } from "./axiosInstance";

export const postRegister = async (data: {
  name: string;
  email: string;
  password: string;
  team: string;
  part: string;
}): Promise<RegisterResponse> => {
  const response = await authApi.post("/users/sign-up", data);
  return response.data.data;
};
