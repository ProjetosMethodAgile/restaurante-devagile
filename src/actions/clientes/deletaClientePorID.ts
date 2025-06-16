'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { tokenUserAuth } from "../user/type/authType";
import jwt from "jsonwebtoken";

export async function deletaClientePorID(id: string) {
  const urlBase = process.env.URL_API;
  const token = (await cookies()).get('token')?.value;
   const user = jwt.decode(token) as tokenUserAuth;
    const empresas = user.empresas ? JSON.stringify(user.empresas) : "[]";
    const empresaIds = JSON.parse(empresas || "[]") as string[];
      
      if (empresaIds.length === 0) {
        return {
          errors: ["Nenhuma empresa selecionada."],
          msg_success: "",
          success: false,
        };
        
      }
  
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(
    `${urlBase}/cliente/${id}/deactivate`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        
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
