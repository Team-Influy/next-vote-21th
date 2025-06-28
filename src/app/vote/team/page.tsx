"use client";

import CandidateCard from "@/app/components/vote/CandidateCard";
import PageTitle from "@/app/components/vote/PageTitle";
import { useTeamCandidates } from "@/hooks/useVote";

export default function TeamCandidatesPage() {
  const { data: candidates } = useTeamCandidates();

  return (
    <div className="flex flex-1 flex-col items-center bg-white px-8 py-14">
      <PageTitle>데모데이 투표</PageTitle>
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
