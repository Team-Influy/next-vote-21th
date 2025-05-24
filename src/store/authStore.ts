import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  accessToken: string;
  refreshToken: string;
  login: (username: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: "",
  accessToken: "",
  refreshToken: "",
  login: (username, accessToken, refreshToken) =>
    set({
      isLoggedIn: true,
      username: username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      username: "",
      accessToken: "",
      refreshToken: "",
    }),
}));
