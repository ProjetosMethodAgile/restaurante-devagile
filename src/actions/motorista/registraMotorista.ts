"use server";
import apiError from "../errors/apiError";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function postMotorista(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    // 1) Extrai todos os campos do FormData
    const nome = formData.get("nome") as string;
    const cpf = formData.get("cpf") as string;
    const rg = formData.get("rg") as string;
    const dataNascimento = formData.get("dataNascimento") as string;
    const contato = formData.get("contato") as string;
    const email = formData.get("email") as string;
    const cep = formData.get("cep") as string;
    const numero = formData.get("numero") as string;
    const rua = formData.get("rua") as string;
    const complemento = formData.get("complemento") as string;
    const bairro = formData.get("bairro") as string;
    const cidade = formData.get("cidade") as string;
    const estado = formData.get("estado") as string;
    const observacao = formData.get("observacao") as string;
    const numeroCnh = formData.get("numeroCnh") as string;
    const categoria = formData.get("categoria") as string;
    const emissaocnh = formData.get("emissaocnh") as string;
    const validadecnh = formData.get("validadecnh") as string;
    const logradouro = formData.get("logradouro") as string;

    if (!nome) {
      return {
        errors: ["Preencha todos os campos obrigatórios."],
        msg_success: "",
        success: false,
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return {
        errors: ["Usuário não autenticado."],
        msg_success: "",
        success: false,
      };
    }
    const empresaCookie = cookieStore.get("empresaStorage")?.value;
    console.log(empresaCookie);
    const empresaIds = [empresaCookie].filter((id): id is string => !!id);

    const url = process.env.URL_API || "http://localhost:3001";

    const response = await fetch(url + "/motorista", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        cpf,
        rg,
        dataNascimento,
        contato,
        email,
        cep,
        numero,
        rua,
        complemento,
        bairro,
        cidade,
        estado,
        observacao,
        numeroCnh,
        categoria,
        emissaocnh,
        validadecnh,
        logradouro,
        empresaIds,
      }),
    });

    if (response.ok) {
      revalidateTag("motorista");
      return {
        success: true,
        errors: [],
        msg_success: "Motorista cadastrado com sucesso.",
      };
    } else {
      return {
        success: false,
        errors: ["Erro ao cadastrar motorista."],
        msg_success: "",
      };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro inesperado, tente novamente.");
  }
}
