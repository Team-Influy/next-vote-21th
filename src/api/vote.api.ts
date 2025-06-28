import { getAuthApi } from "./axiosInstance";
import { LeaderVoteCandidate, TeamVoteCandidate } from "@/app/types/vote.types";

export const fetchLeaderCandidates = async (
  part: string,
): Promise<LeaderVoteCandidate[]> => {
  const response = await getAuthApi().get(`/candidates/leaders/${part}`);
  return response.data.result;
};

export const fetchTeamCandidates = async (): Promise<TeamVoteCandidate[]> => {
  const response = await getAuthApi().get("/candidates/teams");
  return response.data.result;
};
export const postVoteForLeader = async (id: number) => {
  const response = await getAuthApi().post("/votes/leaders", { id });
  return response.data.result;
};

export const postVoteForTeam = async (team: string) => {
  const response = await getAuthApi().post("/votes/teams", { team });
  return response.data.result;
};
