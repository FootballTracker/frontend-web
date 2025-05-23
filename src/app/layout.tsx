import type { Metadata } from "next";
import { Geist, Geist_Mono, Kdam_Thmor_Pro } from "next/font/google";
import "./globals.css";

const kdam_Thmor_Pro = Kdam_Thmor_Pro({
  variable: "--font-kdam",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Tracker",
  description: "Aqui você encontra as principais estatísticas do mundo do futebol!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kdam_Thmor_Pro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
