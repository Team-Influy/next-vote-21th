import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  fetchLeaderCandidates,
  postVoteForLeader,
  fetchTeamCandidates,
  postVoteForTeam,
} from "@/api/vote.api";
import { AxiosError } from "axios";

export const useLeaderCandidates = (part: string) =>
  useQuery({
    queryFn: () => fetchLeaderCandidates(part),
    throwOnError: true,
    queryKey: ["leaderCandidates", part],
    retry: false,
    enabled: !!part,
  });

export const useTeamCandidates = () =>
  useQuery({
    queryFn: () => fetchTeamCandidates(),
    throwOnError: true,
    queryKey: ["teamCandidates"],
    retry: false,
  });

export const useVoteLeader = (id: number) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => postVoteForLeader(id),
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response?.status === 403) {
        router.push("/result");
        alert("이미 투표를 했습니다. 투표 결과 페이지로 이동합니다.");
      }
    },
    onSuccess: () => {
      router.push("/result");
    },
  });
  return { ...mutation };
};

export const useVoteTeam = (team: string) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => postVoteForTeam(team),
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 400) {
        alert(
          axiosError.response?.data?.message ||
            "투표에 실패했습니다. 다시 시도해주세요.",
        );
      }
      if (axiosError.response?.status === 403) {
        alert("이미 투표를 하셨습니다. 투표 결과 페이지로 이동합니다.");
        router.push("/result");
      }
    },
    onSuccess: () => {
      router.push("/result");
    },
  });
  return { ...mutation };
};
