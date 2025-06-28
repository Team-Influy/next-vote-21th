import { ResultResponse } from "@/app/types/result.types";
import { getAuthApi } from "./axiosInstance";

export const getDemoResult = async (): Promise<ResultResponse> => {
  const response = await getAuthApi().get(`/votes/teams/status`);
  return response.data;
};
