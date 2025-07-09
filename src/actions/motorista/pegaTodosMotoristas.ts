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
      return { data: [], error: `Erro ao buscar Motorista: ${message}` };
    }
    const motoristas = (await res.json()) as MotoristaBase[];
    if (motoristas.length < 1)
      return { data: [], error: "Motorista não encontrados" };

    const motoristasFiltrados = motoristas.filter(m =>
      m.empresas.some(e => e.empresa.id === empresaId)
    );
   


    return { data: motoristasFiltrados, error: "" };
  } catch (error) {
    return { data: [], error: "Erro inesperado." };
  }
}
