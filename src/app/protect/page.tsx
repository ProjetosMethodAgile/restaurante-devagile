// /app/protect/page.tsx
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import { CheckCircle } from "lucide-react";

import getUserId from "@/src/actions/user/getUserId";
import { setEmpresa } from "@/src/actions/auth/empresa";

export default async function SelectEmpresaPage() {
  // 1) Buscar o usuário autenticado
  const { data: user } = await getUserId();
  if (!user) {
    // Se não está logado, envia para a rota pública de login ("/")
    redirect("/");
  }

  // 2) Tentar ler cookie “empresaStorage”
  const cookieStore = cookies();
  const empresaCookie = (await cookieStore).get("empresaStorage")?.value;

  if (empresaCookie) {
    // Se já tiver cookie e pertencer ao user, redireciona direto para home
    const encontrada = user.empresas.find(
      (e) => e.empresa.id === empresaCookie
    );
    if (encontrada) {
      redirect("/protect/home");
    } else {
      // Se o cookie existir mas for inválido, apaga e continua
      (await cookieStore).delete({ name: "empresaStorage", path: "/" });
    }
  }

  // 3) Renderizar lista de empresas para seleção
  return (
    <main className="min-h-screen">
      <section className="container-global mt-10">
        <PrimaryTitle title="Selecione a empresa desejada" className="mb-3" />

        <div className="flex flex-col gap-6">
          {user.empresas.map((e) => {
            const empObj = e.empresa;
            return (
              <div
                key={empObj.codigo}
                className="bg-white shadow-md rounded-xl p-8 flex flex-wrap items-center justify-between"
              >
                <div className="flex flex-wrap items-center">
                  <h3 className="font-semibold min-w-35">
                    {empObj.razao_social}
                  </h3>
                  <div className="ml-4 text-text-secondary text-sm flex flex-col">
                    <p>CNPJ: {empObj.cnpj}</p>
                    <p>Tipo da empresa: {empObj.tipoEmpresa.nome}</p>
                    <p>Situação: {empObj.status}</p>
                  </div>
                </div>

                {/* 
                  Botão “Entrar” dispara a Server Action `setEmpresa`, que grava o cookie
                  e redireciona para /protect/home. 
                */}
                <form action={setEmpresa} method="POST">
                  <input type="hidden" name="empresaId" value={empObj.id} />
                  <PrimaryButton
                    className="bg-red-300 border border-red-400/50 hover:bg-red-400 text-red-900"
                    icon={CheckCircle}
                    text="Entrar"
                    type="submit"
                  />
                </form>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
