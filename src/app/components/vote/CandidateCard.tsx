"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useVoteLeader, useVoteTeam } from "@/hooks/useVote";

interface CandidateCardProps {
  id: number;
  name: string;
  description: string;
  voteType: "leader" | "team";
  part?: string;
}
const CandidateCard: React.FC<CandidateCardProps> = ({
  id,
  name,
  description,
  voteType,
  part,
}) => {
  const router = useRouter();
  const { mutate: mutateLeader } = useVoteLeader(id);
  const { mutate: mutateTeam } = useVoteTeam(name);
  const handleVote = () => {
    if (
      window.confirm(
        `"${name}" 후보에게 투표하시겠습니까? 투표는 한 번만 가능합니다.`,
      )
    ) {
      if (voteType === "leader") mutateLeader();
      else {
        mutateTeam();
      }
      router.push("/result");
    }
  };
  return (
    <div
      className="border-neutral-02 flex h-40 w-full transform cursor-pointer flex-col justify-center rounded-2xl bg-white p-5 text-xl font-semibold text-neutral-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-neutral-300 focus:outline-none sm:h-60"
      onClick={handleVote}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleVote();
      }}
    >
      <h2 className="mb-2 text-lg font-semibold text-neutral-900">{name}</h2>
      <p className="text-sm text-neutral-700">{description}</p>
    </div>
  );
};

export default CandidateCard;
