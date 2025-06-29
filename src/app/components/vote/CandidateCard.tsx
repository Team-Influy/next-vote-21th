"use client";
import { useVoteLeader, useVoteTeam } from "@/hooks/useVote";

interface CandidateCardProps {
  id: number;
  name: string;
  description: string;
  voteType: "leader" | "team";
}
const CandidateCard: React.FC<CandidateCardProps> = ({
  id,
  name,
  description,
  voteType,
}) => {
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
    }
  };
  return (
    <div
      className="hover:to-main/20 relative flex h-40 w-full cursor-pointer flex-col justify-center overflow-hidden rounded-md bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:bg-gradient-to-bl hover:from-white hover:shadow-lg focus:outline-none sm:h-60"
      onClick={handleVote}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleVote();
      }}
    >
      {/* 이름 라벨 */}
      <span className="absolute top-4 left-4 w-full rounded-xs bg-black px-4 py-2 text-xl font-bold text-white shadow">
        {name}
      </span>

      {/* 본문 */}
      <p className="mt-14 text-[.9375rem] leading-[160%] font-normal text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default CandidateCard;
