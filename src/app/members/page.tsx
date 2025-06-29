"use client";

import { BACK_MEMBERS, FRONT_MEMBERS } from "@/constants/Members";
import PARTS from "@/constants/Parts";
import cn from "@/utils/cn";
import { useState } from "react";

const Members = () => {
  const [selectedPart, setSelectedPart] = useState<string>(PARTS[0]);

  const members = selectedPart === PARTS[0] ? FRONT_MEMBERS : BACK_MEMBERS;

  return (
    <main className="flex h-full w-full flex-col items-center gap-3 px-8 py-14">
      <h1 className="h1">후보 목록 조회</h1>
      <div className="flex">
        <button
          type="button"
          className={cn(
            "sh1 cursor-pointer rounded-l-md border-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === PARTS[0],
              "bg-white hover:bg-neutral-100": selectedPart !== PARTS[0],
            },
          )}
          onClick={() => setSelectedPart(PARTS[0])}
        >
          프론트엔드
        </button>
        <button
          type="button"
          className={cn(
            "sh1 cursor-pointer rounded-r-md border-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === PARTS[1],
              "bg-white hover:bg-neutral-100": selectedPart !== PARTS[1],
            },
          )}
          onClick={() => setSelectedPart(PARTS[1])}
        >
          백엔드
        </button>
      </div>
      <section className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative flex h-[14rem] w-[10rem] flex-col items-center justify-center overflow-hidden rounded-xs border border-black bg-white px-5 py-5 shadow-sm transition duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white"
          >
            {/* 이름 라벨 */}
            <span className="absolute top-4 left-4 w-full rounded-xs bg-black px-2 py-1 text-xl font-semibold text-white shadow transition duration-300 ease-in-out group-hover:bg-white group-hover:text-black">
              {member.name}
            </span>
            {/* 학과/대학 */}
            <div className="mt-3 flex flex-col items-center gap-1 text-center">
              <span className="b4 text-neutral-800 transition duration-300 ease-in-out group-hover:text-white">
                {member.univ}
              </span>
              <span className="c3 text-neutral-500 transition duration-300 ease-in-out group-hover:text-neutral-200">
                {member.major}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Members;
