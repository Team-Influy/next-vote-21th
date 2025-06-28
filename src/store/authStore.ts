"use client";

import { create } from "zustand";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { postReissue } from "@/api/postReissue";

const REFRESH_TOKEN_KEY = "refreshToken";
const USERNAME_KEY = "username";
const AES_SECRET = "your-strong-secret-key"; // TODO: Replace with env var in production

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
}
function decrypt(cipher: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, AES_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
}

function saveRefreshTokenToStorage(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, encrypt(token));
  }
}
function removeRefreshTokenFromStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
export function getRefreshTokenFromStorage(): string {
  if (typeof window !== "undefined") {
    const cipher = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (cipher) return decrypt(cipher);
  }
  return "";
}
function saveUsernameToStorage(username: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERNAME_KEY, username);
  }
}
function removeUsernameFromStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USERNAME_KEY);
  }
}
function getUsernameFromStorage(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USERNAME_KEY) || "";
  }
  return "";
}

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  accessToken: string; // memory only
  refreshToken: string; // memory only
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUserName: (name: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

const initialUsername =
  typeof window !== "undefined" ? getUsernameFromStorage() : "";

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: initialUsername,
  accessToken: "",
  refreshToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => {
    saveRefreshTokenToStorage(token);
    set({ refreshToken: token });
  },
  setUserName: (name) => {
    saveUsernameToStorage(name);
    set({ username: name });
  },
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  logout: () => {
    removeRefreshTokenFromStorage();
    removeUsernameFromStorage();
    set({
      isLoggedIn: false,
      username: "",
      accessToken: "",
      refreshToken: "",
    });
  },
}));

export function useReissueToken() {
  const {
    accessToken,
    setAccessToken,
    setRefreshToken,
    setUserName,
    setIsLoggedIn,
    logout,
  } = useAuthStore();
  useEffect(() => {
    const refreshToken = getRefreshTokenFromStorage();
    if (!accessToken && refreshToken) {
      (async () => {
        try {
          const res = await postReissue(refreshToken);
          setAccessToken(res.result.accessToken);
          setRefreshToken(res.result.refreshToken);
          setIsLoggedIn(true);
        } catch (e) {
          logout();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
