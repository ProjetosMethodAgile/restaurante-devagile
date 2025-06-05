import type { FormClienteData } from '@/src/types/cliente/clientType';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { STRING } from 'sequelize';

export async function postCustomer(data: FormClienteData | undefined) {
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
  let token: string;
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      console.error('Token não encontrado nos cookies.');
      return [];
    }
    token = tokenCookie.value;
  } catch (err) {
    console.error('Falha ao obter cookies:', err);
    return [];
  }

  // 2) Normalizar e validar campos críticos
  // CPF
  const cpfSomenteDigitos = (data.cpf ?? '').replace(/\D/g, '');
  if (cpfSomenteDigitos.length !== 11) {
    console.error('CPF inválido: precisa de exatamente 11 dígitos.');
    return [];
  }

  // CEP (8 dígitos)
  const cepSomenteDigitos = data.cep.replace(/\D/g, '');
  if (cepSomenteDigitos.length !== 8) {
    console.error('CEP inválido: precisa de exatamente 8 dígitos.');
    return [];
  }

  // Conversão de frete (string "x.xxx,xx" ou "xxx,xx"): transformamos em número
  const freteRaw = typeof data.frete === 'string' ? data.frete : '';
  const freteFormatado = freteRaw
    ? Number(freteRaw.replace(/\./g, '').replace(',', '.'))
    : 0; // Ou, se a API quiser string: freteRaw.replace(/\./g, '').replace(',', '.')
  if (isNaN(freteFormatado) || freteFormatado < 0) {
    console.error('Frete inválido: precisa ser um número maior ou igual a zero.');
    return [];
  }
   const cpfTratado = cpfSomenteDigitos.replace(/\D/g, '');
  // 3) Montar payload conforme o que a API realmente espera
  const payload = {
    contato: (data.contato ?? '').trim(),
    nome: data.nome.trim(),
    email: (data.email ?? '').trim(),
    cpf: cpfTratado,
    rua: data.rua.trim(),
    numero: data.numero.trim(),
    bairro: data.bairro.trim(),
    cep: cepSomenteDigitos,
    cidade: (data.cidade ?? '').trim(),
    estado: data.estado, 
    complemento: (data.complemento ?? '').trim(),
    frete: String(freteFormatado),
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
    if (!res.ok) {
 
      let erroDetalhado: string;
      try {
        const json = await res.json();
        erroDetalhado = JSON.stringify(json, null, 2);
      } catch {
        erroDetalhado = await res.text();
      }
      console.error('Resposta de erro do servidor:', erroDetalhado);
      return [];
    }
    revalidateTag('clientes');
    const responseData = await res.json();
    return responseData;

  } catch (error) {
    console.error('Erro ao criar cliente (exceção):', error);
    return [];
  }
}
