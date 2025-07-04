"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { tokenUserAuth } from "../user/type/authType";
import jwt from "jsonwebtoken";

export async function postMotorista(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const contato = formData.get("contato") as string;
    const cpf = formData.get("cpf") as string;
    const rg = formData.get("rg") as string;
    const dataNascimento = formData.get("dataNascimento") as string;
    const numeroCnh = formData.get("numeroCnh") as string;
    const categoriaCnh = formData.get("categoria") as string;
    const dataEmissaoCnh = formData.get("emissaocnh") as string;
    const dataValidadeCnh = formData.get("validadecnh") as string;
    const cep = formData.get("cep") as string;
    const numero = formData.get("numero") as string;
    const rua = formData.get("rua") as string;
    const complemento = formData.get("complemento") as string;
    const bairro = formData.get("bairro") as string;
    const cidade = formData.get("cidade") as string;
    const estado = formData.get("estado") as string;
    const frete = formData.get("frete") as string;
    const observacao = formData.get("observacao") as string;

    if (!nome || !contato || !numero || !rua || !cidade || !estado || !frete) {
      return {
        errors: ["Preencha todos os campos obrigatórios."],
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

    const url = "http://localhost:3001/";
    const response = await fetch(url + "cliente", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeCompleto: nome,
        email,
        telefone: contato,
        cpf,
        rg,
        dataNascimento,
        numeroCNH: numeroCnh,
        categoriaCNH: categoriaCnh,
        dataEmissaoCNH: dataEmissaoCnh,
        dataValidadeCNH: dataValidadeCnh,
        endereco: {
          logradouro: rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          cep,
        },
        frete: Number(frete),
        observacao,
        empresaIds,
      }),
    });

    console.log("Response status:", response.status);
    if (response.ok) {
      revalidateTag("clientes");
      return {
        success: true,
        errors: [],
        msg_success: "Cliente cadastrado com sucesso.",
      };
    } else {
      return {
        success: false,
        errors: ["Erro ao cadastrar cliente."],
        msg_success: "",
      };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
