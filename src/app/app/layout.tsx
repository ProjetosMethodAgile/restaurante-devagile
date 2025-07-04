// /app/app/layout.tsx
import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

import getUserId from "@/src/actions/user/getUserId";
import { UserContextProvider } from "@/src/context/userContext";
import NavigationMenu from "@/src/components/Header/NavigationMenu";
import { ToastContainer } from "react-toastify";
import getTelasByRoleId from "@/src/actions/telas/getTelasByRoleId";

export default async function ProtectLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1) Verificar token do usuário
  const { data: user } = await getUserId();
  if (!user) {
    redirect("/");
    return null;
  }

  const telas = await getTelasByRoleId(user.role.id);


  if (telas.error) {
    console.error("Erro ao buscar telas:", telas.error);
    redirect("/error");
    return null;
  }

  // 2) Verificar cookie "empresaStorage"
  const cookieStore = cookies();
  const empresaCookie = (await cookieStore).get("empresaStorage")?.value;

  
  if (!empresaCookie) {
    redirect("/select-empresa");
    return null;
  }

  // 3) Verificar se a empresa pertence ao usuário
  const encontrada = user.empresas.find((e) => e.empresa.id === empresaCookie);
  if (!encontrada) {
    (await cookieStore).delete({ name: "empresaStorage", path: "/" });
    redirect("/select-empresa");
    return null;
  }

  const empresaSelecionada = encontrada.empresa;

  // 4) Renderizar contexto + header + conteúdo protegido
  return (
    <UserContextProvider user={user} empresa={empresaSelecionada}>
      <NavigationMenu
        user={user}
        empresa={empresaSelecionada}
      />
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </UserContextProvider>
  );
}
