import NavigationMenu from "@/src/components/Header/NavigationMenu";

// app/[empresa]/protect/layout.tsx
export default async function ProtectedEmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <header className="animate-move-right-to-left">
        <NavigationMenu />
      </header>
      <div className="h-[100vh] w-[100vw] overflow-auto">{children}</div>
    </div>
  );
}
