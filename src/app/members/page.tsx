"use client";

import ProfileIcon from "@/assets/images/ProfileIcon.svg";
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
            "sh1 border-black-2 cursor-pointer rounded-l-md border-y-2 border-l-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === PARTS[0],
              "hover:bg-neutral-03 bg-white": selectedPart !== PARTS[0],
            },
          )}
          onClick={() => setSelectedPart(PARTS[0])}
        >
          프론트엔드
        </button>
        <button
          type="button"
          className={cn(
            "sh1 cursor-pointer rounded-r-md border-y-2 border-r-2 border-black px-4 py-2",
            {
              "bg-black text-white": selectedPart === PARTS[1],
              "hover:bg-neutral-03 bg-white": selectedPart !== PARTS[1],
            },
          )}
          onClick={() => setSelectedPart(PARTS[1])}
        >
          백엔드
        </button>
      </div>
      <section className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex h-[16rem] w-[10rem] flex-col items-center justify-center gap-3 rounded-lg bg-black px-5 py-5 text-white"
          >
            <ProfileIcon className="h-15 w-15 text-white" />
            <span className="flex flex-col items-center gap-2 text-center">
              <h2 className="sh1 flex w-fit border-b border-white">
                {member.name}
              </h2>
              <p className="flex flex-col">
                <span className="b4 text-neutral-01 flex break-keep whitespace-break-spaces">
                  {member.univ}
                </span>
                <span className="c3 text-neutral-02">{member.major}</span>
              </p>
            </span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Members;
