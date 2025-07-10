"use server";

import { cookies } from "next/headers";
import {
  ClienteBase,
  GetClientePorIDResponse,
} from "@/src/types/cliente/clientType";

export default async function getClientesPorID(
  id: string
): Promise<GetClientePorIDResponse> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return {
      data: [] as ClienteBase[],
      error: "Token não encontrado.",
    };
  }

  const url = process.env.URL_API || "http://localhost:3001";

  if (!id) {
    return {
      data: [] as ClienteBase[],
      error: "Usuário não passado.",
    };
  }
  try {
    const res = await fetch(`${url}/cliente/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["clientes"],
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return {
        data: [] as ClienteBase[],
        error: `Erro ao buscar cliente: ${message}`,
      };
    }

    const clientes = (await res.json()) as ClienteBase[];

    return { data: clientes, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: [] as ClienteBase[],
      error: "Erro inesperado.",
    };
  }
}
