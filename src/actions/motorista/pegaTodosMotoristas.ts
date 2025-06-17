"use server";

import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import { cookies } from "next/headers";


export default async function getMotoristas() {
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
    const res = await fetch(`${url}/motorista`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["motorista"],
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return { data: null, error: `Erro ao buscar Motorista: ${message}` };
    }
    const produtos = (await res.json()) as MotoristaBase[];
    if (produtos.length < 1)
      return { data: null, error: "Motorista não encontrados" };

    return { data: produtos, error: "" };
  } catch (error) {
    return { data: null, error: "Erro inesperado." };
  }
}
