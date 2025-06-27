"use client";

import PARTS from "@/constants/Parts";
import cn from "@/utils/cn";
import { useState } from "react";
import CrownIcon from "@/assets/images/CrownIcon.svg";

const Result = () => {
  const RESULT_LIST = [...PARTS, "DEMODAY"];
  const [selectedPart, setSelectedPart] = useState<string>(RESULT_LIST[0]);

  const data = [
    {
      id: 1,
      team: "INFLUY",
      description: "옹냥냥",
      numVotes: 7,
      ratioVotes: 15,
    },
    {
      id: 2,
      team: "INFLUY",
      description: "옹냥냥",
      numVotes: 7,
      ratioVotes: 15,
    },
    {
      id: 3,
      name: "string",
      description: "string",
      voteNum: 0,
      ratioVotes: 0,
    },
  ];

  const maxVote = Math.max(
    ...data.map((item) => item?.numVotes ?? item?.voteNum),
  );

  return (
    <main className="flex h-full w-full flex-col items-center gap-3 px-8 py-14">
      <h1 className="h1">{selectedPart} 투표 결과</h1>
      <div className="flex">
        <button
          type="button"
          className={cn(
            "sh1 border-black-2 cursor-pointer rounded-l-md border-y-2 border-l-2 border-black px-4 py-2",
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
            "sh1 cursor-pointer border-2 border-y-2 border-black px-4 py-2",
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
            "sh1 cursor-pointer rounded-r-md border-y-2 border-r-2 border-black px-4 py-2",
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
      <section className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="relative flex h-[14rem] w-[10rem] flex-col items-center justify-center gap-3 rounded-lg bg-black px-5 py-5 text-white"
          >
            {maxVote === item?.numVotes && (
              <CrownIcon className="absolute top-3 left-3 h-10 w-10 -rotate-[20deg] text-[#ffdb69]" />
            )}
            <span className="flex flex-col items-center gap-2 text-center">
              <h2 className="sh1 flex w-fit border-b border-white">
                {item?.name || item?.team}
              </h2>
              <p className="flex flex-col items-center">
                {selectedPart !== "DEMODAY" && (
                  <span className="b4 text-neutral-01 flex break-keep whitespace-break-spaces">
                    {item?.team}
                  </span>
                )}
                <span className="b4 text-neutral-02">
                  득표수: {item?.numVotes ?? item?.voteNum}
                </span>
              </p>
            </span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Result;
