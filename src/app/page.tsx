"use client";
import Link from "next/link";

const Home = () => {
  const handleClickVoteForTeamLeader = () => {
    console.log("handleClickVoteForTeamLeader");
  };
  const handleClickVoteForDemoDay = () => {
    console.log("handleClickVoteForDemoDay");
  };
  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-8 py-14">
      <h1 className="h1 text-green-08 text-center">CEOS 21TH VOTE</h1>
      <div className="text-green-06 flex h-full flex-col items-center justify-center gap-4 text-xl font-semibold sm:flex-row">
        <Link
          href="/vote/leader"
          className="border-green-06 hover:bg-green-06 flex h-35 w-full shrink-0 cursor-pointer items-center justify-center rounded-md border-2 p-5 text-center break-words whitespace-break-spaces hover:text-white sm:h-60 sm:w-60"
        >
          Vote for Team Leader
        </Link>
        <Link
          href="/vote/team"
          className="border-green-06 hover:bg-green-06 flex h-35 w-full shrink-0 cursor-pointer items-center justify-center rounded-md border-2 p-5 break-words whitespace-break-spaces hover:text-white sm:h-60 sm:w-60"
        >
          Vote for Demo Day
        </Link>
      </div>
    </div>
  );
};

export default Home;
