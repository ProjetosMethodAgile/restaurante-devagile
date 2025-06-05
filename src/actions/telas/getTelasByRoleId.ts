"use server";

import { cookies } from "next/headers";
import { TelaBase } from "@/src/types/tela/tela";

export default async function getTelasByRoleId(roleId: string) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { data: null, error: "Token não encontrado." };
  }

  const url = process.env.API_URL || "http://localhost:3001";

  try {
    const res = await fetch(`${url}/tela/role/${roleId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: `Erro ao buscar telas: ${message}` };
    }

    const telas = (await res.json()) as TelaBase[];

    return { data: telas };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Erro inesperado." };
  }
}
