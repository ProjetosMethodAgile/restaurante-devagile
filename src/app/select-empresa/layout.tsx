// /app/select-empresa/layout.tsx
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import getUserId from "@/src/actions/user/getUserId";

import { UserContextProvider } from "@/src/context/userContext";
import NavigationMenu from "@/src/components/Header/NavigationMenu";

export default async function SelectEmpresaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: user } = await getUserId();
  if (!user) {
    redirect("/");
  }

  return (
    <UserContextProvider user={user} empresa={null}>
      <NavigationMenu user={user} empresa={null} />
      {children}
    </UserContextProvider>
  );
}
