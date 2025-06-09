"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: string;
  iconHover: string;
}

export default function SidebarItem({
  href,
  label,
  icon,
  iconHover,
}: SidebarItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex gap-2 py-3 hover:text-red"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={hover ? iconHover : icon}
        width={28}
        height={28}
        alt={`Ícone de ${label.toLowerCase()}`}
      />
      <Link href={href}>{label}</Link>
    </div>
  );
}
