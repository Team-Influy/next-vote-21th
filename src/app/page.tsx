"use client";

const Home = () => {
  const handleClickVoteForTeamLeader = () => {
    console.log("handleClickVoteForTeamLeader");
  };
  const handleClickVoteForDemoDay = () => {
    console.log("handleClickVoteForDemoDay");
  };
  return (
    <div className="flex flex-1 items-center flex-col px-8 py-14 gap-10">
      <h1 className="text-center h1 text-green-08">CEOS 21TH VOTE</h1>
      <div className="flex flex-col h-full items-center justify-center gap-4 sh2 text-green-06 sm:flex-row">
        <button
          type="button"
          className="border-2 h-35 w-full border-green-06 p-5 cursor-pointer rounded-md whitespace-break-spaces break-words shrink-0 hover:text-white hover:bg-green-06 sm:h-60 sm:w-60"
          onClick={handleClickVoteForTeamLeader}
        >
          Vote for Team Leader
        </button>
        <button
          type="button"
          className="border-2 h-35 w-full border-green-06 p-5 cursor-pointer rounded-md whitespace-break-spaces break-words shrink-0 hover:text-white hover:bg-green-06 sm:h-60 sm:w-60"
          onClick={handleClickVoteForDemoDay}
        >
          Vote for Demo Day
        </button>
      </div>
    </div>
  );
};

export default Home;
