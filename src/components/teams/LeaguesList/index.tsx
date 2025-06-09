import { GoTrophy } from "react-icons/go";
import LeagueCard from "../LeagueCard";

export default function LeaguesList() {
  return (
    <section className="flex flex-col gap-8 text-white ">
      <div className="flex items-center gap-2 text-[32px] border-b border-red pb-5">
        <GoTrophy size={36} color="#933038" />
        <h2>Favoritos</h2>
      </div>

      <div className="flex gap-4 flex-wrap">
        {mockLeagues.map((league) => (
          <LeagueCard 
            logo={league.logo}
            name={league.name}
            description={league.description}
          />
        ))}
      </div>
    </section>
  );
}

const mockLeagues: {
  logo: string;
  name: string;
  description?: string;
}[] = [
  {
    logo: "/mock-icons/brasileirao.svg",
    name: "Brasileirão",
    description: "Descrição curta",
  },
  {
    logo: "/mock-icons/brasileirao.svg",
    name: "La liga",
    description: "Descrição curta",
  },
  {
    logo: "/mock-icons/brasileirao.svg",
    name: "Premier League",
    description: "Descrição curta",
  },
  {
    logo: "/mock-icons/brasileirao.svg",
    name: "Brasileirão",
    description: "Descrição curta",
  },
  {
    logo: "/mock-icons/brasileirao.svg",
    name: "Brasileirão",
    description: "Descrição curta",
  },
];
