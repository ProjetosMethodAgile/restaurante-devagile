// /src/components/Login/SelectEmpresa/ListEmpresas.tsx
import React from "react";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import { CheckCircle } from "lucide-react";

import getUserId from "@/src/actions/user/getUserId";
import { setEmpresa } from "@/src/actions/auth/empresa";
import { redirect } from "next/navigation";

export default async function ListEmpresas() {
  const { data: user } = await getUserId();
  if (!user) {
    // Isso não costuma acontecer porque já verificamos acima, mas só por segurança:
    redirect("/");
  }

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

                <form action={setEmpresa}>
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
