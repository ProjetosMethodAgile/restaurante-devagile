"use server";

import { cookies } from "next/headers";
import { TelaBase } from "@/src/types/tela/tela";
import { UsuarioBase } from "@/src/types/user/userType";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";

export default async function getCategoriasByEmp() {
  const token = (await cookies()).get("token")?.value;
  const empresaId = (await cookies()).get("empresaStorage")?.value;

  if (!token) {
    return { data: null, error: "Token não encontrado." };
  }

  if (!empresaId) {
    return { data: null, error: "Empresa não encontrada." };
  }

  const url = process.env.API_URL || "http://localhost:3001";

  try {
    const res = await fetch(`${url}/categoria`, {
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
      return { data: null, error: `Erro ao buscar categorias: ${message}` };
    }
    const categorias = (await res.json()) as CategoriaBase[];
    if (categorias.length < 1)
      return { data: null, error: "Categorias não encontradas" };

    return { data: categorias, error: "" };
  } catch (error) {
    return { data: null, error: "Erro inesperado." };
  }
}
