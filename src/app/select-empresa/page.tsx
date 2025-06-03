// /app/select-empresa/page.tsx
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUserId from "@/src/actions/user/getUserId";
import ListEmpresas from "@/src/components/Login/SelectEmpresa/ListEmpresas";

export default async function SelectEmpresaPage() {
  const { data: user } = await getUserId();
  if (!user) {
    redirect("/");
  }

  const cookieStore = cookies();
  const empresaCookie = (await cookieStore).get("empresaStorage")?.value;
  if (empresaCookie) {
    const encontrada = user.empresas.find(
      (e) => e.empresa.id === empresaCookie
    );
    if (encontrada) {
      redirect("/app/home");
    } else {
      (await cookieStore).delete({ name: "empresaStorage", path: "/" });
    }
  }

  return <ListEmpresas />;
}
