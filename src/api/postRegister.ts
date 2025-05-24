import { authApi } from "./axiosInstance";

export const postRegister = async (data: {
  name: string;
  email: string;
  password: string;
  team: string;
  part: string;
}): Promise<any> => {
  const response = await authApi.post("/users/sign-up", data);
  return response.data.data;
};
