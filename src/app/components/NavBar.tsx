"use client";

import Link from "next/link";
import { User, Menu, SquareX } from "lucide-react";
import cn from "@/utils/cn";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

//추후에 경로 추가하기
const NAVBAR_ITEMS = [
  { key: 0, name: "투표 바로가기", destination: "/", isLoginRequired: true },
  { key: 1, name: "결과 바로보기", destination: "/", isLoginRequired: true },
  { key: 2, name: "후보 살펴보기", destination: "/", isLoginRequired: false },
];

const NavBar = () => {
  //추후에 로그인 상태 불러오기
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, username, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-12 w-screen sm:h-16 lg:h-20">
      {/* 좌측 */}
      <section className="z-1 flex w-full items-center justify-between bg-white px-4 shadow-lg shadow-gray-400/10">
        <div className="flex items-center gap-3">
          <button
            className="text-gray-500 sm:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <SquareX size={20} /> : <Menu size={20} />}
          </button>
          <Link className="text-[1.25rem] font-bold text-gray-700" href={"/"}>
            InfluyVote
          </Link>
        </div>

        {/* 우측 메뉴 (sm 이상) */}
        <div className="flex items-center gap-5">
          {NAVBAR_ITEMS.map(
            (item) =>
              (!item.isLoginRequired || isLoggedIn) && (
                <Link
                  key={item.key}
                  href={item.destination}
                  className={cn(
                    "hidden text-sm font-medium text-gray-600 hover:underline hover:underline-offset-4",
                    "sm:flex",
                  )}
                >
                  {item.name}
                </Link>
              ),
          )}
          {isLoggedIn && (
            <span
              className={cn(
                "hidden text-sm font-medium text-gray-600 hover:underline hover:underline-offset-4",
                "sm:flex",
              )}
              onClick={() => handleLogout()}
            >
              로그아웃
            </span>
          )}
          <button
            className="bg-green-03 text-green-07 flex h-fit w-fit cursor-pointer items-center rounded-lg px-3 py-1 sm:px-4 sm:py-2"
            onClick={() => {
              if (!isLoggedIn) {
                router.push("/login");
              }
            }}
          >
            <User className="stroke-2.5 mr-1 h-[1rem] sm:h-[1.2rem]" />
            <span>{isLoggedIn ? username + "님" : "Login"}</span>
          </button>
        </div>
      </section>
      {/* 사이드바 + 배경 레이어 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-500/20 backdrop-blur-xs sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="bg-green-02 fixed top-12 left-0 flex h-full w-1/3 flex-col space-y-4 px-4 py-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {NAVBAR_ITEMS.map(
              (item) =>
                (!item.isLoginRequired || isLoggedIn) && (
                  <Link
                    key={item.key}
                    href={item.destination}
                    className="text-sm font-medium text-gray-600"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
            )}
            {isLoggedIn && (
              <button
                className="text-left text-sm font-medium text-gray-600"
                onClick={() => handleLogout()}
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
