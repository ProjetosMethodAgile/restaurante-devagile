"use server";

import { cookies } from "next/headers";
import { TelaBase } from "@/src/types/tela/tela";
import { UsuarioBase } from "@/src/types/user/userType";

export default async function getUsersByEmpId() {
  const token = (await cookies()).get("token")?.value;
  const empresaId = (await cookies()).get("empresaStorage")?.value;

  if (!token) {
    return { data: null, error: "Token não encontrado." };
  }

  if (!empresaId) {
    return { data: null, error: "Empresa não encontrada." };
  }

  const url = process.env.URL_API || "http://localhost:3001";

  try {
    const res = await fetch(`${url}/usuario/empresa/${empresaId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["new-user"],
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: `Erro ao buscar usuarios: ${message}` };
    }

    const usuarios = (await res.json()) as UsuarioBase[];

    return { data: usuarios };
  } catch (error) {
    return { data: null, error: "Erro inesperado." };
  }
}
