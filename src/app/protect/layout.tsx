import NavigationMenu from "@/src/components/Header/NavigationMenu";

// app/[empresa]/protect/layout.tsx
export default async function ProtectedEmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card">
      <NavigationMenu />
      <div className="h-[100vh]  w-[100vw] overflow-auto bg-card">{children}</div>
    </div>
  );
}
