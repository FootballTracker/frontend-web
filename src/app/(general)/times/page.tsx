import FavoriteTeams from "@/components/teams/FavoriteTeams";
import LeaguesList from "@/components/teams/LeaguesList";
import { FaSearch } from "react-icons/fa";

export default function TimesPage() {
  return (
    <main className="flex flex-col gap-6 py-7 px-10 overflow-y-scroll">
      <h1 className="text-white text-3xl">Times</h1>

      <div className="flex gap-2 bg-light-background px-2.5 py-2 rounded-lg border border-black text-white max-w-[500px]">
        <FaSearch size={24} color="white"/>
        <input type="text" placeholder="Pesquise seu time..." className="outline-none focus:outline-none"/>
      </div>

      <div className="flex gap-16">
        <FavoriteTeams />

        <LeaguesList />
      </div>
    </main>
  );
}
