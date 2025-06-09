"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SidebarItem from "../SidebarItem";

export default function Sidebar() {
  const [hover, setHover] = useState(false);

  return (
    <aside className="flex flex-col items-center bg-dark-background border-r border-red rounded-br-xl rounded-tr-xl min-w-[200px] py-7">
      <Image
        src="/logo-horizontal.svg"
        width={140}
        height={68}
        alt="Logo horizontal do Football Tracker"
      />

      <hr className="text-red w-40 mt-3" />

      <nav className="text-2xl text-white flex-col">
        <SidebarItem
          href="/times"
          label="Times"
          icon="/navbar-icons/team.svg"
          iconHover="/navbar-icons/team-hover.svg"
        />
        <hr className="text-red w-40" />

        <SidebarItem
          href="/ligas"
          label="Ligas"
          icon="/navbar-icons/league.svg"
          iconHover="/navbar-icons/league-hover.svg"
        />
        <hr className="text-red w-40" />

        <SidebarItem
          href="/jogadores"
          label="Jogadores"
          icon="/navbar-icons/player.svg"
          iconHover="/navbar-icons/player-hover.svg"
        />
        <hr className="text-red w-40" />

        <SidebarItem
          href="/perfil"
          label="Perfil"
          icon="/navbar-icons/profile.svg"
          iconHover="/navbar-icons/profile-hover.svg"
        />
      </nav>
    </aside>
  );
}
