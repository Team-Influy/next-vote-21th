"use client";
import Influy from "@/assets/images/Influy.svg";
import CandidateCard from "@/app/components/vote/CandidateCard";
import { useTeamCandidates } from "@/hooks/useVote";

export default function TeamCandidatesPage() {
  const { data: candidates } = useTeamCandidates();

  return (
    <div className="flex flex-1 flex-col items-center bg-white px-8 py-14">
      <div className="flex h-fit flex-col items-center justify-center">
        <Influy className="mb-4 scale-[2]" />
        <span className="text-md font-semibold tracking-wider text-gray-700">
          데모데이 팀 투표
        </span>
      </div>{" "}
      <div className="grid w-9/12 grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {candidates &&
          candidates.map((c) => (
            <CandidateCard
              key={c.id}
              id={c.id}
              name={c.team}
              description={c.description}
              voteType="team"
            />
          ))}
      </div>
    </div>
  );
}
