import { FormClienteData } from '@/src/types/cliente/clientType';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function postCustomer(data: FormClienteData) {
  const url = process.env.URL_API;
  if (!url) {
    console.error("URL_API não está definida");
    return [];
  }

  let token: string | undefined;
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      console.error("Token não encontrado nos cookies");
      return [];
    }
    token = tokenCookie.value;
  } catch (err) {
    console.error("Falha ao obter cookies:", err);
    return [];
  }
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {

    if (value !== undefined && value !== null) {
  
      formData.append(key, String(value));
    }
  });


  try {
    const res = await fetch(`${url}/clientes`, {
      method: 'POST',
      headers: {
   
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    revalidateTag('clientes');

    if (!res.ok) {
      console.error(
        `Erro ao criar cliente: status ${res.status} - ${res.statusText}`
      );
      return [];
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return [];
  }
}
