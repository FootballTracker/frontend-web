import { League } from "@/app/(general)/ligas/page";
import { Team } from "@/app/(general)/times/page";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface IFavoriteList {
  listOf: Team[] | League[];
  type: "team" | "league";
}

export default function FavoriteList({ listOf, type }: IFavoriteList) {
  return (
    <div className="flex flex-col gap-8 text-white">
      <div className="flex items-center gap-2 border-b border-red pb-5 text-[32px]">
        <FaStar size={36} color="#933038" />
        <h2>Favoritos</h2>
      </div>

      <div className="flex flex-col gap-4">
        {listOf.length > 0 ? (
          listOf.map((item) => {
            const isTeam = type === "team";
            const logoUrl = isTeam ? (item as Team).logo : (item as League).logo_url;
            const altText = `Logo d${isTeam ? "o" : "a"} ${item.name}`;

            return (
              <div key={item.id} className="flex items-center justify-between gap-16">
                <div className="flex items-center gap-2">
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      height={32}
                      width={32}
                      alt={altText}
                    />
                  )}
                  <span className="text-[28px]">{item.name}</span>
                </div>

                <FaStar size={36} color="#933038" />
              </div>
            );
          })
        ) : (
          <span> Você não tem favoritos, faça login para ver. </span>
        )}
      </div>
    </div>
  );
}