"use server";

import { cookies } from "next/headers";
import { ClienteBase } from "@/src/types/cliente/clientType";
import getUserId from "../user/getUserId";

export default async function getClientes() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { data: [], error: "Token não encontrado." };
  }

  const url = process.env.API_URL || "http://localhost:3001";

  try {
    const res = await fetch(`${url}/cliente/`, {
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
      return { data: [], error: `Erro ao buscar clientes: ${message}` };
    }

    const clientes = (await res.json()) as ClienteBase[];
    const { data: user } = await getUserId();
    const cookieStore = cookies();
    const empresaCookie = (await cookieStore).get("empresaStorage")?.value;
    const encontrada = user?.empresas.find(
      (e) => e.empresa.id === empresaCookie
    );
    const empresaid = encontrada?.empresa.id;

    const clientesFiltrados = clientes.filter((c) =>
      c.empresas.some((e) => e.empresa.id === empresaid)
    );

    return { data: clientesFiltrados };
  } catch (error) {
    console.log(error);
    return { data: [], error: "Erro inesperado." };
  }
}
