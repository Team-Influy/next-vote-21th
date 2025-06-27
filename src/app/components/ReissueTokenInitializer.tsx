"use client";

import { useEffect } from "react";
import { useReissueToken } from "@/hooks/useUser";
import { getDecryptedRefreshToken, useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";

export default function ReissueTokenInitializer() {
  const refreshToken = getDecryptedRefreshToken();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { mutate } = useReissueToken();
  const pathname = usePathname();

  useEffect(() => {
    // 1) 리프레시 토큰이 존재하고
    // 2) 아직 로그인 상태가 아니며
    // 3) 로그인 페이지가 아닐 때만
    if (refreshToken && !isLoggedIn && pathname !== "/login") {
      mutate();
    }
  }, [refreshToken, isLoggedIn, pathname, mutate]);

  return null;
}
