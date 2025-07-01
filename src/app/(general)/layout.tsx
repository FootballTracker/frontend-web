import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100dvh] bg-medium-background font-kdam">
      <Sidebar /> 
      {children}
    </div>
  );
}
  