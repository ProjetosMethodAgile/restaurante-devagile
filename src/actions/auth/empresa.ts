// /src/actions/auth/empresa.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUserId from "@/src/actions/user/getUserId";

export async function setEmpresa(formData: FormData): Promise<void> {
  // 1) Extrair o ID da empresa do FormData
  const empresaId = formData.get("empresaId")?.toString() ?? "";
  if (!empresaId) {
    throw new Error("ID da empresa é obrigatório.");
  }

  // 2) Obter o usuário autenticado (via getUserId)
  const { data: user } = await getUserId();
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  // 3) Verificar se esta empresaId pertence ao usuário
  const encontrada = user.empresas.find((e) => e.empresa.id === empresaId);
  if (!encontrada) {
    throw new Error("Empresa inválida para este usuário.");
  }

  // 4) Gravar o cookie HTTP-Only "empresaStorage"
  (await cookies()).set("empresaStorage", empresaId, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });

  // 5) Redirecionar para /app/home
  redirect("/app/home");
}
