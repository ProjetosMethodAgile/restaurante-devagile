"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

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
    const empresaIds = JSON.parse(empresas || "[]") as string[];
    const tipoProduto = formData.get("tipo_produto") as string;
    const precoBase = formData.get("preco_base") as string;
    const variacoesIds = formData.getAll("variacao_id") as string[];
    const variacoesPrecos = formData.getAll("variacao_preco") as string[];
    let variacoes = [];

    if (tipoProduto === "unico") {
      if (precoBase === "0" || precoBase === "") {
        return {
          errors: ["O Preço deve ser maior que zero."],
          msg_success: "",
          success: false,
        };
      }
      variacoes.push({
        variacao_id: "587893e5-f7f9-43a2-865e-7ba84ba519a3",
        preco: +precoBase || 0,
      });
    }

    if (tipoProduto === "variavel") {
      const variacoesObj = variacoesIds.map((id, index) => {
        return {
          variacao_id: id,
          preco: +variacoesPrecos[index] || 0,
        };
      });
      variacoes = variacoesObj;
    }

    if (!nome || !descricao) {
      return {
        errors: [
          "Preencha todos os campos obrigatórios:" +
            `${nome ? "" : "Nome"}${descricao ? "" : ",Descrição"}`,
        ],
        msg_success: "",
        success: false,
      };
    }

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

    const url = process.env.URL_API || "http://localhost:3001";

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
        variacoes,
        tipo: tipoProduto,
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
