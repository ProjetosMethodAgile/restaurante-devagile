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
      <div className="overflow-auto bg-stone-100">{children}</div>
    </div>
  );
}
