// app/vote/leader/page.tsx
"use client";

import Link from "next/link";
import PageTitle from "@/app/components/vote/PageTitle";

export default function VotePartCategoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-white px-8 py-14">
      <PageTitle>파트장 투표 분야 선택</PageTitle>
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 md:flex-row">
        <Link href="/vote/leader/backend">
          <button className="border-neutral-02 flex h-40 transform cursor-pointer items-center justify-center rounded-2xl bg-white p-5 text-xl font-semibold text-neutral-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-neutral-300 focus:outline-none sm:h-60 sm:w-60">
            BE
          </button>
        </Link>
        <Link href="/vote/leader/frontend">
          <button className="border-neutral-02 flex h-40 w-40 transform cursor-pointer items-center justify-center rounded-2xl bg-white p-5 text-xl font-semibold text-neutral-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-neutral-300 focus:outline-none sm:h-60 sm:w-60">
            FE
          </button>
        </Link>
      </div>
    </div>
  );
}
