"use server";

import { cookies } from "next/headers";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";

export default async function getVariacoesByEmp() {
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
    const res = await fetch(`${url}/variacao`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["get-variacao"],
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: `Erro ao buscar categorias: ${message}` };
    }
    const variacoes = (await res.json()) as VariacaoBase[];

    if (variacoes.length < 1)
      return { data: null, error: "Variações não encontradas" };

    return { data: variacoes, error: "" };
  } catch (error) {
    return { data: null, error: "Erro inesperado." };
  }
}
