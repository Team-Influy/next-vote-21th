"use client";
import Link from "next/link";
import Influy from "@/assets/images/INFLUY.svg";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-8 py-14">
      <div className="flex flex-col items-center justify-center">
        <Influy className="mb-2 scale-[2]" />
        <span className="text-2xl font-semibold tracking-wider text-gray-700">
          vote
        </span>
      </div>
      <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/vote/leader"
          className="flex w-full flex-1/2 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border-2 bg-black p-5 text-center text-lg font-semibold text-white hover:bg-gradient-to-b hover:from-black hover:to-[#f43232]/40 sm:h-60"
        >
          <span className="h2">파트장</span>
          <span className="c1">투표하기</span>
        </Link>
        <Link
          href="/vote/team"
          className="flex w-full flex-1/2 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border-2 bg-black p-5 text-center text-lg font-semibold text-white hover:bg-gradient-to-b hover:from-black hover:to-[#f43232]/40 sm:h-60"
        >
          <span className="h2">데모데이</span>
          <span className="c1">투표하기</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
