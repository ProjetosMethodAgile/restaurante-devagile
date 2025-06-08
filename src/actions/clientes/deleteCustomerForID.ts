'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCustomerForID(id: string) {
  const urlBase = process.env.URL_API!;
  const token = (await cookies()).get('token')?.value;
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(
    `${urlBase}/clientes/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        // não precisa de 'Content-Type' nem de body
      },
    }
  );
  if (!response.ok) {
    const errText = await response.text();
    console.error(`Erro ao deletar cliente: ${response.status} – ${errText}`);
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  revalidateTag('clientes');
  return response.json();
}
