import { useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchLeaderCandidates,
  postVoteForLeader,
  fetchTeamCandidates,
  postVoteForTeam,
} from "@/api/vote.api";

export const useLeaderCandidates = (part: string) =>
  useQuery({
    queryFn: () => fetchLeaderCandidates(part),
    queryKey: ["leaderCandidates", part],
    retry: false,
    enabled: !!part,
  });

export const useTeamCandidates = () =>
  useQuery({
    queryFn: () => fetchTeamCandidates(),
    queryKey: ["teamCandidates"],
    retry: false,
  });

export const useVoteLeader = (id: number) => {
  const mutation = useMutation({
    mutationFn: () => postVoteForLeader(id),
  });
  return { ...mutation };
};

export const useVoteTeam = (team: string) => {
  const mutation = useMutation({
    mutationFn: () => postVoteForTeam(team),
  });
  return { ...mutation };
};
