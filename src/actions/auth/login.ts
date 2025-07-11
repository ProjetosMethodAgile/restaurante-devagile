"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginResult =
  | { success: true }
  | { success: false; message: string };

export async function login(
  _prev: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  try {
    const email = formData.get("email")?.toString() ?? "";
    const senha = formData.get("senha")?.toString() ?? "";

    if (!email || !senha) {
      return { success: false, message: "E-mail e senha são obrigatórios" };
    }
    const url = process.env.URL_API || "http://localhost:3001";

    if (url) {
      const res = await fetch(`${url}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        return {
          success: false,
          message: "Credenciais inválidas, tente novamente",
        };
      }

      const { token } = await res.json();

      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      redirect("/app/");
    } else {
      return {
        success: false,
        message: "Erro interno no sistemaa",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Erro interno no sistema",
    };
  }
}
