"use client";

import PARTS from "@/constants/Parts";
import cn from "@/utils/cn";
import { useState } from "react";
import VoteResult from "@/app/components/VoteResult";

const Result = () => {
  const RESULT_LIST = [...PARTS, "DEMODAY"];
  const [selectedPart, setSelectedPart] = useState<string>(RESULT_LIST[0]);

  return (
    <main className="flex h-full w-full flex-col items-center justify-start gap-3 self-start px-8 py-14">
      <h1 className="h1 text-gray-900">
        {selectedPart === RESULT_LIST[0]
          ? "프론트엔드"
          : selectedPart === RESULT_LIST[1]
            ? "백엔드"
            : "데모데이"}{" "}
        투표 결과
      </h1>

      <div className="flex w-full justify-around border-b border-neutral-200 py-2">
        {RESULT_LIST.map((part) => (
          <button
            key={part}
            onClick={() => setSelectedPart(part)}
            className={cn(
              "flex w-1/3 cursor-pointer flex-col items-center gap-1 px-2 py-1 transition-colors duration-300",
              selectedPart === part ? "text-[#f43232]" : "text-neutral-500",
            )}
          >
            <span className="c1 font-semibold">
              {part === RESULT_LIST[0]
                ? "프론트엔드"
                : part === RESULT_LIST[1]
                  ? "백엔드"
                  : "데모데이"}
            </span>
            {/* 선택된 메뉴 underline */}
            {selectedPart === part && (
              <span className="bg-main mt-0.5 block h-0.5 w-4 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <VoteResult selectedPart={selectedPart} />
    </main>
  );
};

export default Result;
