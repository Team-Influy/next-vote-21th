import { ResultResponse } from "@/app/types/result.types";
import { getAuthApi } from "./axiosInstance";

export const getPartResult = async (part: string): Promise<ResultResponse> => {
  const response = await getAuthApi().get(`/votes/leaders/${part}/status`);
  return response.data;
};
