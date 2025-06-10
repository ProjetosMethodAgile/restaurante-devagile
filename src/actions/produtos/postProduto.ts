"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { log } from "console";

export async function postProduto(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const nome = formData.get("nome") as string;
    const descricao = formData.get("descricao") as string;
    const categoria = formData.get("categoria") as string;
    const empresas = formData.get("empresaIds") as string;
    const precoBase = formData.get("precoBase") as string;
    const variantes = formData.get("variantes") as string;
    const incluir_variacoes = formData.get("incluir_variacoes") as string;

    if (!nome || !descricao) {
      return {
        errors: ["Preencha todos os campos obrigatórios."],
        msg_success: "",
        success: false,
      };
    }

    const empresaIds = JSON.parse(empresas || "[]") as string[];

    if (empresaIds.length === 0) {
      return {
        errors: ["Atribua pelo menos uma empresa ao produto."],
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

    const url = "http://localhost:3001/";
    const response = await fetch(url + "produto", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        descricao,
        empresaIds,
        categoryIds: [categoria],
        variacoes: incluir_variacoes
          ? [
              {
                variacao_id: "7f148f90-5d64-459c-8b10-765f7b105f44",
                preco: precoBase,
              },
            ]
          : [],
      }),
    });

    if (response.ok) {
      revalidateTag("new-product");

      return {
        success: true,
        errors: [],
        msg_success: "Produto Cadastrado com sucesso.",
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
