"use client";

import PARTS from "@/constants/Parts";
import cn from "@/utils/cn";
import { useState } from "react";
import VoteResult from "@/app/components/VoteResult";

const Result = () => {
  const RESULT_LIST = [...PARTS, "DEMODAY"];
  const [selectedPart, setSelectedPart] = useState<string>(RESULT_LIST[0]);

  return (
    <main className="flex h-full w-full flex-col items-center gap-3 px-8 py-14">
      <h1 className="h1">{selectedPart} 투표 결과</h1>
      <div className="flex">
        <button
          type="button"
          className={cn(
            "b1 md:sh1 cursor-pointer rounded-l-md border-y-2 border-l-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === RESULT_LIST[0],
              "hover:bg-neutral-03 bg-white": selectedPart !== RESULT_LIST[0],
            },
          )}
          onClick={() => setSelectedPart(RESULT_LIST[0])}
        >
          프론트엔드
        </button>
        <button
          type="button"
          className={cn(
            "b1 md:sh1 cursor-pointer border-2 border-y-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === RESULT_LIST[1],
              "hover:bg-neutral-03 bg-white": selectedPart !== RESULT_LIST[1],
            },
          )}
          onClick={() => setSelectedPart(RESULT_LIST[1])}
        >
          백엔드
        </button>
        <button
          type="button"
          className={cn(
            "b1 md:sh1 cursor-pointer rounded-r-md border-y-2 border-r-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === RESULT_LIST[2],
              "hover:bg-neutral-03 bg-white": selectedPart !== RESULT_LIST[2],
            },
          )}
          onClick={() => setSelectedPart(RESULT_LIST[2])}
        >
          데모데이
        </button>
      </div>
      <VoteResult selectedPart={selectedPart} />
    </main>
  );
};

export default Result;
