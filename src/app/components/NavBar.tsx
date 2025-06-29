"use client";

import Link from "next/link";
import { User, Menu, SquareX } from "lucide-react";
import cn from "@/utils/cn";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Influy from "@/assets/images/Influy.svg";

//추후에 경로 추가하기
const NAVBAR_ITEMS = [
  { key: 0, name: "투표 바로가기", destination: "/", isLoginRequired: true },
  {
    key: 1,
    name: "후보 목록 조회",
    destination: "/members",
    isLoginRequired: false,
  },
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
    <nav className="fixed top-0 left-0 z-10 flex h-10 w-screen sm:h-16 lg:h-20">
      {/* 좌측 */}
      <section className="z-1 flex w-full items-center justify-between bg-white px-4 shadow-lg shadow-gray-400/10">
        <div className="flex items-center gap-3">
          <button
            className="text-gray-700 sm:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <SquareX size={20} /> : <Menu size={20} />}
          </button>
          <Link
            className="flex flex-col text-[1.25rem] font-semibold tracking-wider text-gray-600"
            href={"/"}
          >
            <Influy className="mt-1.5 inline w-fit" />
            <p className="text-center text-xs">vote</p>
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
                    "hover:text-main hidden text-sm font-medium text-gray-700 hover:underline hover:underline-offset-4",
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
                "hidden text-sm font-medium text-gray-700 hover:underline hover:underline-offset-4",
                "sm:flex",
              )}
              onClick={() => handleLogout()}
            >
              로그아웃
            </span>
          )}
          <button
            className="flex h-fit w-fit cursor-pointer items-center rounded-[.125rem] border-1 border-gray-500 bg-white px-2.5 py-1 text-sm font-medium text-gray-700 sm:px-3 sm:py-1.75"
            onClick={() => {
              if (!isLoggedIn) {
                router.push("/login");
              }
            }}
          >
            <User className="stroke-2.5 mr-1 h-[.875rem] sm:h-[1rem]" />
            <span>{isLoggedIn ? username + "님" : "로그인"}</span>
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
            className="fixed top-12 left-0 flex h-full w-1/3 flex-col space-y-4 bg-white px-4 py-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {NAVBAR_ITEMS.map(
              (item) =>
                (!item.isLoginRequired || isLoggedIn) && (
                  <Link
                    key={item.key}
                    href={item.destination}
                    className="hover:text-main text-sm font-medium text-gray-700 hover:underline hover:underline-offset-4"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
            )}
            {isLoggedIn && (
              <button
                className="hover:text-main text-left text-sm font-medium text-gray-700 hover:underline hover:underline-offset-4"
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
