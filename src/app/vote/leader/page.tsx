"use client";
import Influy from "@/assets/images/Influy.svg";
import Link from "next/link";

export default function VotePartCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-8 py-14">
      <div className="flex h-fit flex-col items-center justify-center">
        <Influy className="mb-4 scale-[2]" />
        <span className="text-md font-semibold tracking-wider text-gray-700">
          파트 선택
        </span>
      </div>
      <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/vote/leader/frontend"
          className="flex h-40 w-full flex-1/2 shrink-0 transform cursor-pointer items-center justify-center rounded-sm bg-black p-5 text-xl font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-gradient-to-bl hover:from-black hover:to-[#f43232]/40 hover:shadow-lg sm:h-60"
        >
          FRONTEND
        </Link>
        <Link
          href="/vote/leader/backend"
          className="flex h-40 w-full flex-1/2 shrink-0 transform cursor-pointer items-center justify-center rounded-sm border-2 bg-black p-5 text-center text-xl font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-black hover:to-[#f43232]/40 hover:shadow-lg sm:h-60"
        >
          BACKEND
        </Link>
      </div>
    </div>
  );
}
