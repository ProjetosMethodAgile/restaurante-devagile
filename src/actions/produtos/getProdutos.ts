"use server";

import { cookies } from "next/headers";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { ProdutoBase } from "@/src/types/produto/produtoType";

export default async function getProdutos() {
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
    const res = await fetch(`${url}/produto`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["new-produto"],
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: `Erro ao buscar produtos: ${message}` };
    }
    const produtos = (await res.json()) as ProdutoBase[];
    if (produtos.length < 1)
      return { data: null, error: "Produtos não encontrados" };

    return { data: produtos, error: "" };
  } catch (error) {
    return { data: null, error: "Erro inesperado." };
  }
}
