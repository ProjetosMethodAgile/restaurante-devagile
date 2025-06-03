"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
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
    const empresas = formData.get("empresaIds") as string;
    const telas = formData.get("telaIds") as string;
  
    if (!nome || !email || !roleId) {
      return {
        errors: ["Preencha todos os campos obrigatórios."],
        msg_success: "",
        success: false,
      };
    }

    const empresaIds = JSON.parse(empresas || "[]") as string[];
    const telaIds = JSON.parse(telas || "[]") as string[];

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
        empresaIds,
        telaIds,
        acaoTelaIds: ["8808d943-d840-43b8-a148-3d967b71c229"], // ajuste quando tiver isso implementado
      }),
    });

    console.log(await response.json());

    if (response.ok) {
      revalidateTag("new-user");
      return {
        success: true,
        errors: [],
        msg_success: "Usuário cadastrado com sucesso.",
      };
    } else {
      return {
        success: false,
        errors: ["Erro ao cadastrar, contate o administrador do sistema."],
        msg_success: "",
      };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
