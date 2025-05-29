import getUserId from "@/src/actions/user/getUserId";
import NavigationMenu from "@/src/components/Header/NavigationMenu";
import { redirect } from "next/navigation";

// app/[empresa]/protect/layout.tsx
export default async function ProtectedEmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUserId();

  if (!user) {
    redirect("/");
  }
  return (
    <div className="bg-card">
      <NavigationMenu />
      <div className="overflow-auto bg-stone-100">{children}</div>
    </div>
  );
}
