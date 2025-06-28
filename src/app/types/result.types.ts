export interface ResultResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    candidates?: PartResultType[];
    resultList?: DemoDayResultType[];
  };
  totalVotes: number;
}

export interface PartResultType {
  id: number;
  name: string;
  description: string;
  voteNum: number;
  ratioVotes: number;
}

export interface DemoDayResultType {
  id: number;
  team: string;
  description: string;
  numVotes: number;
  ratioVotes: number;
}
