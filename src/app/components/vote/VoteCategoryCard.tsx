import Link from "next/link";

interface VoteCategoryCardProps {
  title: string;
  href: string;
}

const VoteCategoryCard: React.FC<VoteCategoryCardProps> = ({ title, href }) => (
  <Link href={href}>
    <button className="block w-full cursor-pointer rounded-lg border border-neutral-200 p-6 text-center transition hover:border-neutral-300 focus:ring-2 focus:ring-neutral-300 focus:outline-none">
      <span className="text-xl font-semibold text-neutral-900">{title}</span>
    </button>
  </Link>
);

export default VoteCategoryCard;
