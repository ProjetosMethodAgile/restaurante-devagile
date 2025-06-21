"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { tokenUserAuth } from "../user/type/authType";
import jwt from "jsonwebtoken";

export async function deletaClientePorID(id: string) {
  try {
    
    if (!id) {  
      return {
        errors: ["Id invalido."],
        msg_success: "",
        success: false,
      };
    }

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return {
        errors: ["Usuário não autenticado"],
        msg_success: "",
        success: false,
      };
    }
    
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

    if (!token) {
      return {
        errors: ["Usuário não autenticado"],
        msg_success: "",
        success: false,
      };
    }

    const url = "http://localhost:3001/";



// 
    const response = await fetch(url + `cliente/${id}/deactivate`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
      // body: JSON.stringify({
      //   empresaIds: empresaIds
      // }),
    });

   console.log("Response status:", response);
   
    if (response.ok) {
      revalidateTag("clientes");
      return {
        success: true,
        errors: [],
        msg_success: "Cliente deletado com sucesso.",
      };
    } else {
      return {
        success: false,
        errors: ["Erro ao deletar cliente."],
        msg_success: "",
      };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}






