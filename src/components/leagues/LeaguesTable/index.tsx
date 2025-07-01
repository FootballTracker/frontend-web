import { League } from "@/app/(general)/ligas/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCrown, FaRegStar, FaStar } from "react-icons/fa";

interface ILeaguesList {
  leagues: League[];
}

export default function LeaguesTable({ leagues }: ILeaguesList) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-8 text-white w-full max-w-1/2">
      <div className="flex items-center gap-2 text-[32px] border-b border-red pb-5">
        <FaCrown size={36} color="#933038" />
        <h2>Principais</h2>
      </div>

      <div className="flex w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-zinc-700 text-white">
              {/* Coluna para o logo */}
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="text-white">Nome</TableHead>
              <TableHead className="text-white">Temporada</TableHead>
              <TableHead className="text-right text-white">Favorito</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagues.map((league) => (
              <TableRow
                key={league.id}
                className="border-zinc-800"
                onClick={() => router.push(`/ligas/${league.id}`)}
              >
                <TableCell>
                  {league.logo_url && (
                    <Image
                      src={league.logo_url}
                      alt={`Logo da ${league.name}`}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{league.name}</TableCell>
                <TableCell>{league.season}</TableCell>
                <TableCell className="flex justify-end">
                  {league.is_favorite ? (
                    <FaStar size={24} color="#933038" />
                  ) : (
                    <FaRegStar size={24} color="#933038" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
