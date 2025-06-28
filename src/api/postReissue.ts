import { getAuthApi } from "./axiosInstance";

export interface ReissueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

export const postReissue = async (
  refreshToken: string,
): Promise<ReissueResponse> => {
  const response = await getAuthApi().post("/users/reissue", { refreshToken });
  return response.data;
};
