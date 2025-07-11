// src/actions/clientes/alterCustomerForID.ts
"use server";
import { formatDateToISO } from "@/src/utils/ConverteData";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function alterarMotoristaPorID(
  id: string,
  data: {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    contato: string;
    email: string;
    cep: string;
    numero: string;
    rua: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    observacao: string;
    numeroCnh: string;
    categoria: string;
    emissaocnh: string;
    validadecnh: string;
    logradouro: string;
  }
) {
  const url = process.env.URL_API || "http://localhost:3001";

  if (!url) {
    console.error("URL_API não está definida");
    throw new Error("Configuração de ambiente inválida");
  }
  // obtém token
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  if (!tokenCookie) throw new Error("Usuário não autenticado");
  const token = tokenCookie.value;
  const empresaCookie = cookieStore.get("empresaStorage")?.value;
  const empresaIds = [empresaCookie].filter((id): id is string => !!id);


const payload = {
  nome: data.nome.trim(),
  cpf: data.cpf?.replace(/\D/g, '') ?? null,
  rg: data.rg?.trim() ?? null,
  dataNascimento: formatDateToISO(data.dataNascimento?.trim()) ?? null,
  contato: data.contato?.trim() ?? null,
  email: data.email?.trim() ?? null,
  cep: data.cep?.replace(/\D/g, '') ?? null,
  numero: data.numero?.trim() ?? null,
  rua: data.rua?.trim() ?? null,
  complemento: data.complemento?.trim() ?? null,
  bairro: data.bairro?.trim() ?? null,
  cidade: data.cidade?.trim() ?? null,
  estado: data.estado?.trim() ?? null,
  observacao: data.observacao?.trim() ?? null,
  numeroCnh: data.numeroCnh?.trim().replace(/\D/g, "") ?? null,
  categoria: data.categoria?.trim() ?? null,
  emissaocnh: formatDateToISO(data.emissaocnh?.trim()) ?? null,
  validadecnh: formatDateToISO(data.validadecnh?.trim()) ?? null,
  empresaIds: empresaIds ?? null,
};


  const response = await fetch(
    `${urlBase}/motorista/${id}`,
    {
      method: 'PATCH',                // <-- PATCH em vez de PUT
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(
      `Erro ao atualizar motorista: ${response.status} - ${errText}`
    );
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  revalidateTag("motorista");

  return {
    data: response.json(),
    error: false,
  };
}
