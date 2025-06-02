"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { tokenUserAuth } from "./type/authType";

export async function postUser(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const roleId = formData.get("roleId") as string;
    
    const errors: string[] = [];

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return {
        errors: ["Usuário não autenticado"],
        msg_success: "",
        success: false,
      };
    }

    const url = "http://localhost:3001/";
    const response = await fetch(url + "usuario/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        role_Id: roleId,
        empresaIds: ["90b32df2-c8ff-4f5c-a1e7-bdf16f8fc3f4"],
        telaIds: ["7e6ab337-2f8d-4cb5-9701-cd26856495f2"],
        acaoTelaIds: ["8808d943-d840-43b8-a148-3d967b71c229"],
      }),
    });

    if (response.ok) {
      revalidateTag("new-user");
      return {
        success: true,
        errors: [],
        msg_success: "Usuário cadastrado com sucesso.",
      };
    } else {
      errors.push("Erro ao cadastrar, contate o administrador do sistema.");
      return { success: false, errors, msg_success: "" };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
