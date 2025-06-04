import type { FormClienteData } from '@/src/types/cliente/clientType';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function postCustomer(data: FormClienteData | undefined) {
  // 0) Validação inicial: se "data" não vier definido, interrompe
  if (!data) {
    console.error('postCustomer: parâmetro "data" indefinido.');
    return [];
  }

  const urlBase = process.env.URL_API;
  if (!urlBase) {
    console.error('URL_API não está definida');
    return [];
  }



  // 1) Ler o token dos cookies
  let token: string | undefined;
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      console.error('Token não encontrado nos cookies');
      return [];
    }
    token = tokenCookie.value;
  } catch (err) {
    console.error('Falha ao obter cookies:', err);
    return [];
  }

  // 2) Converter frete (string) para número, garantindo que freteRaw seja string
  const freteRaw = typeof data.frete === 'string' ? data.frete : '';
  const freteFormatado = freteRaw
    ? Number(freteRaw.replace(/\./g, '').replace(',', '.'))
    : 0;

  // 3) Preparar payload
  const payload = {
    contato: (data.contato ?? '').trim(),
    nome: data.nome.trim(),
    email: (data.email ?? '').trim(),
    // Caso CPF seja indefinido, usamos string vazia antes de extrair dígitos
    cpf: (data.cpf ?? '').replace(/\D/g, ''),
    rua: data.rua.trim(),
    numero: data.numero.trim(),
    bairro: data.bairro.trim(),
    cep: data.cep.replace(/\D/g, ''), // só números
    cidade: (data.cidade ?? '').trim(),
    estado: data.estado,
    complemento: (data.complemento ?? '').trim(),
    frete: freteFormatado,
    observacao: (data.observacao ?? '').trim(),
  };

  try {
    const res = await fetch(`${urlBase}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    revalidateTag('clientes'); // invalida cache se estiver usando o novo caching do Next.js

    if (!res.ok) {
      console.error(
        `Erro ao criar cliente: status ${res.status} — ${res.statusText}`
      );
      return [];
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return [];
  }
}
