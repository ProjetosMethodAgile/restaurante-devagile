// src/actions/clientes/alterCustomerForID.ts
'use server';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function alterarClientePorID(
  id: string,
  data: {
    contato?: string;
    nome: string;
    email?: string;
    cpf?: string;
    rua?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
    complemento?: string;
    frete?: string;
    observacao?: string;
  }
) {
  const urlBase = process.env.URL_API;
  if (!urlBase) {
    console.error('URL_API não está definida');
    throw new Error('Configuração de ambiente inválida');
  }

  // obtém token
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  if (!tokenCookie) throw new Error('Usuário não autenticado');
  const token = tokenCookie.value;

  const payload = {
    nome: data.nome.trim(),
    contato: data.contato?.trim() ?? null,
    email: data.email?.trim() ?? null,
    cpf: data.cpf?.replace(/\D/g, '') ?? null,
    rua: data.rua?.trim() ?? null,
    numero: data.numero?.trim() ?? null,
    bairro: data.bairro?.trim() ?? null,
    cep: data.cep?.replace(/\D/g, '') ?? null,
    cidade: data.cidade?.trim() ?? null,
    estado: data.estado ?? null,
    complemento: data.complemento?.trim() ?? null,
    frete: data.frete?.trim() ?? null,
    observacao: data.observacao?.trim() ?? null,
  };
console.log(payload);

  const response = await fetch(
    `${urlBase}/cliente/${id}`,
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
    console.error(`Erro ao atualizar cliente: ${response.status} - ${errText}`);
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  revalidateTag('clientes');
  
  return{
        data: response.json() ,
        error: false,
      };
}
