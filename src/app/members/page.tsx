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
      <h1 className="h1 text-gray-900">후보 목록</h1>
      <div className="border-main-dark relative flex h-12 w-64 rounded-full border bg-white p-1">
        {/* 이동하는 강조 pill */}
        <div
          className={cn(
            "absolute top-1 bottom-1 rounded-full transition-all duration-300",
            selectedPart === PARTS[0]
              ? "bg-main-dark left-1 w-1/2"
              : "bg-main-dark [left:calc(50%-0.25rem)] w-1/2",
          )}
        ></div>

        {/* 선택 영역 */}
        <button
          type="button"
          className={cn(
            "relative z-10 flex-1 rounded-full text-center transition-colors duration-300",
            selectedPart === PARTS[0] ? "text-white" : "text-main-dark",
          )}
          onClick={() => setSelectedPart(PARTS[0])}
        >
          프론트엔드
        </button>
        <button
          type="button"
          className={cn(
            "relative z-10 flex-1 rounded-full text-center transition-colors duration-300",
            selectedPart === PARTS[1] ? "text-white" : "text-main-dark",
          )}
          onClick={() => setSelectedPart(PARTS[1])}
        >
          백엔드
        </button>
      </div>

      <section className="break-words-keep-all mt-6 grid cursor-pointer grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative flex h-[14rem] w-[10rem] flex-col items-center justify-center overflow-hidden rounded-xs border border-black bg-white px-5 py-5 shadow-sm transition duration-300 ease-in-out hover:scale-105 hover:text-white"
          >
            {/* 이름 라벨 */}
            <span className="absolute top-4 left-4 z-1 w-full rounded-xs bg-black px-2 py-1 text-xl font-semibold text-white shadow transition duration-300 ease-in-out group-hover:bg-white group-hover:text-black">
              {member.name}
            </span>
            {/* 학과/대학 */}
            <div className="mt-3 flex flex-col items-center gap-1 text-center">
              <span className="b4 text-neutral-800 transition duration-300 ease-in-out group-hover:hidden">
                {member.univ}
              </span>
              <span className="c3 break-words text-neutral-500 transition duration-300 ease-in-out group-hover:hidden">
                {member.major}
              </span>
            </div>
            <div className="bg-opacity-50 absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-black/90 p-5 pt-14 transition duration-300 ease-in-out group-hover:flex">
              <span className="c3 text-neutral-800 transition duration-300 ease-in-out group-hover:text-white">
                {member.description}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Members;
