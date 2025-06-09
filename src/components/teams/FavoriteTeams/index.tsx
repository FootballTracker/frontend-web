import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function FavoriteTeams() {
  return (
    <div className="flex flex-col gap-8 text-white ">
      <div className="flex items-center gap-2 text-[32px] border-b border-red pb-5">
        <FaStar size={36} color="#933038" />
        <h2>Favoritos</h2>
      </div>

      {/* lista de times favoritos */}
      <div className="flex flex-col gap-4">
        {mockTeams.map((team) => (
          <div className="flex justify-between gap-16">
            <div className="flex gap-2">
              <Image
                src={team.logo}
                height={32}
                width={32}
                alt="Logo do time"
              />
              <span className="text-[28px]">{team.name}</span>
            </div>

            <FaStar size={36} color="#933038" />
          </div>
        ))}
      </div>
    </div>
  );
}

const mockTeams: {
  logo: string;
  name: string;
}[] = [
  {
    logo: "/team-icons/internacional.svg",
    name: "Internacional",
  },
  {
    logo: "/team-icons/internacional.svg",
    name: "Bahia",
  },
  {
    logo: "/team-icons/internacional.svg",
    name: "Brasil",
  },
];
