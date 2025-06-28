"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="h2">404 Not Found</h1>
      <p className="b4 text-neutral-10">페이지를 찾을 수 없습니다.</p>
      <button
        type="button"
        className="b4 cursor-pointer rounded-sm bg-black px-3 py-2 text-white"
        onClick={() => router.push("/")}
      >
        홈으로 이동하기
      </button>
    </main>
  );
};

export default NotFoundPage;
