import { getDemoResult } from "@/api/getDemoResult";
import { getPartResult } from "@/api/getPartResult";
import { QUERY_KEYS } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import {
  DemoDayResultType,
  PartResultType,
  ResultResponse,
} from "@/app/types/result.types";
import cn from "@/utils/cn";

const VoteResult = ({ selectedPart }: { selectedPart: string }) => {
  const { data: demoResult } = useQuery<ResultResponse>({
    queryKey: [QUERY_KEYS.RESULT, selectedPart],
    queryFn: () => getDemoResult(),
    enabled: selectedPart === "DEMODAY",
    throwOnError: true,
  });

  const { data: partResult } = useQuery<ResultResponse>({
    queryKey: [QUERY_KEYS.RESULT, selectedPart],
    queryFn: () => getPartResult(selectedPart),
    enabled: selectedPart !== "DEMODAY",
    throwOnError: true,
  });

  const data =
    (selectedPart === "DEMODAY"
      ? demoResult?.result.resultList
      : partResult?.result.candidates) ?? [];

  const maxVote = Math.max(
    ...data?.map((item) => ("numVotes" in item ? item.numVotes : item.voteNum)),
  );

  return (
    <section className="break-words-keep-all mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data?.map((item: PartResultType | DemoDayResultType) => (
        <div
          key={item.id}
          className={cn(
            "relative flex h-[14rem] w-[10rem] flex-col items-center justify-center overflow-hidden rounded-xs border border-black bg-black px-5 py-5 shadow-sm hover:shadow-lg",
            maxVote !== 0 &&
              ("numVotes" in item ? item?.numVotes : item?.voteNum) ===
                maxVote &&
              "bg-gradient-to-b from-black to-[#712527]",
          )}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="sh1 flex w-fit border-b border-white text-white">
              {"name" in item ? item?.name : item?.team}
            </h2>
            <span className="b4 text-neutral-02">
              득표수: {"numVotes" in item ? item?.numVotes : item?.voteNum}
            </span>
            <span className="c3 text-neutral-03 absolute right-3 bottom-2">
              득표율: {item?.ratioVotes}%
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VoteResult;
