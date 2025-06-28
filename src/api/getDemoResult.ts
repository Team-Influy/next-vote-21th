import { ResultResponse } from "@/app/types/result.types";
import { authApi } from "./axiosInstance";

export const getDemoResult = async (): Promise<ResultResponse> => {
  const response = await authApi.get(`/votes/teams/status`);
  return response.data;
};
