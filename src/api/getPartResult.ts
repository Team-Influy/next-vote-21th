import { ResultResponse } from "@/app/types/result.types";
import { authApi } from "./axiosInstance";

export const getPartResult = async (part: string): Promise<ResultResponse> => {
  const response = await authApi.get(`/votes/leaders/${part}/status`);
  return response.data;
};
