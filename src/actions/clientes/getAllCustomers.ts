import { cookies } from 'next/headers';
export async function getAllCustomer() {
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

  try {
    const res = await fetch(`${url}/clientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
        next: {
            tags: ['clientes'],
        },
    });

    if (!res.ok) {
      console.error(
        `Erro ao buscar clientes: status ${res.status} - ${res.statusText}`
      );
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
}
