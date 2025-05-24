export interface RegisterResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
  };
}