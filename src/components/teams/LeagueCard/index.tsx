import Image from "next/image";

interface ILeagueCard {
  logo: string;
  name: string;
  description?: string;
}

export default function LeagueCard({ logo, name, description }: ILeagueCard) {
  return (
    <div className="px-3 py-5 flex flex-col gap-2 items-center text-white bg-red rounded-lg border border-white min-w-[240px] hover:scale-105 transition-all cursor-pointer">
      <Image src={logo} height={110} width={110} alt="Logo da liga" />

      <div className="flex flex-col self-start">
        <span className="text-2xl">{name}</span>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
}
