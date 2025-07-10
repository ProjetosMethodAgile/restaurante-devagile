"use server";

import { cookies } from "next/headers";
import {
  GetMotoristaPorIDResponse,
  MotoristaBase,
} from "@/src/types/motorista/motoristaType";

export default async function getMotoristaPorID(
  id: string
): Promise<GetMotoristaPorIDResponse> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return {
      data: [] as MotoristaBase[],
      error: "Token não encontrado.",
    };
  }

  const url = process.env.URL_API || "http://localhost:3001";

  if (!id) {
    return {
      data: [] as MotoristaBase[],
      error: "Usuário não passado.",
    };
  }
  try {
    const res = await fetch(`${url}/motorista/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["motorista"],
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const message = await res.text();
      return {
        data: [] as MotoristaBase[],
        error: `Erro ao buscar motorista: ${message}`,
      };
    }

    const clientes = (await res.json()) as MotoristaBase[];

    return { data: clientes, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: [] as MotoristaBase[],
      error: "Erro inesperado.",
    };
  }
}
