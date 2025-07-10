"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function patchUser(
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
    const userId = formData.get("userId") as string;

    if (!nome || !email || !roleId) {
      return {
        errors: ["Preencha todos os campos obrigatórios."],
        msg_success: "",
        success: false,
      };
    }

    const empresaIds = JSON.parse(empresas || "[]") as string[];
    const telaIds = JSON.parse(telas || "[]") as string[];

    if (empresaIds.length === 0) {
      return {
        errors: ["Atribua pelo menos uma empresa ao usuario."],
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

    const url = process.env.URL_API || "http://localhost:3001";

    const response = await fetch(url + `usuario/${userId}`, {
      method: "PATCH",
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
      }),
    });

    if (response.ok) {
      revalidateTag("auth");

      return {
        success: true,
        errors: [],
        msg_success: "Usuário atualizado com sucesso.",
      };
    } else {
      const { message } = await response.json();
      return {
        success: false,
        errors: [message],
        msg_success: "",
      };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
