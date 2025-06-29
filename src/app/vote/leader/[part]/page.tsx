"use client";
import Influy from "@/assets/images/Influy.svg";
import CandidateCard from "@/app/components/vote/CandidateCard";
import PageTitle from "@/app/components/vote/PageTitle";
import { useLeaderCandidates } from "@/hooks/useVote";
import { usePathname } from "next/navigation";

export default function LeaderCandidatesPage() {
  const pathname = usePathname();

  const part = getPartFromPath(pathname);

  function getPartFromPath(pathname: string): "FE" | "BE" {
    const last = pathname.split("/").filter(Boolean).pop();
    return last === "backend" ? "BE" : "FE";
  }

  const { data: candidates } = useLeaderCandidates(part);

  if (!part) return null;
  const title = part === "FE" ? "프론트엔드 파트장 후보" : "백엔드 파트장 후보";

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-8 py-14">
      <div className="flex h-fit flex-col items-center justify-center">
        <Influy className="mb-4 scale-[2]" />
        <span className="text-md font-semibold tracking-wider text-gray-700">
          {title}
        </span>
      </div>
      <div className="grid w-9/12 grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {candidates &&
          candidates.map((c) => (
            <CandidateCard
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              voteType="leader"
              part={part}
            />
          ))}
      </div>
    </div>
  );
}
