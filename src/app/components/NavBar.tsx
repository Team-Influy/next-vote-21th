import Link from "next/link";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 z-10 flex h-12 w-screen items-center justify-between bg-white px-9 shadow-lg shadow-gray-400/10 md:h-16 lg:h-20">
      <div className="flex items-center gap-3">
        <Link className="text-[1.25rem] font-bold text-gray-800" href={"/"}>
          InfluyVote
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
