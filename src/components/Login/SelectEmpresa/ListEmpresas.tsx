"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CurrentEmpresaProps, useUser } from "@/src/context/userContext";
import PrimaryTitle from "../../UI/PrimaryTitle";
import { CheckCircle } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";
import logoff from "@/src/actions/auth/logoff";

export type ListEmpresasProps = React.ComponentProps<"div"> & {};

export default function ListEmpresas({ ...props }: ListEmpresasProps) {
  const { user, empresa, setCurrentEmpresa } = useUser();
  const router = useRouter();

  // Enquanto user estiver undefined, não renderiza nada
  if (user === undefined) {
    return null;
  }

  // Se usuário não autenticado, redireciona para login/protect
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Assim que detectar empresa já no contexto ou no localStorage, redireciona para /protect/home
  useEffect(() => {
    if (!user) return;

    // Se existir empresa salva no localStorage e for válida, seta contexto e redireciona
    const empresaId = window.localStorage.getItem("empresaStorage");
    if (empresaId) {
      const encontrada = user.empresas.find(
        (emp) => emp.empresa.id === empresaId
      );
      if (encontrada) {
        setCurrentEmpresa(encontrada.empresa);
      } else {
        logoff();
      }
    }
  }, [user, empresa, setCurrentEmpresa, router]);

  // Se não há user (usuário não está autenticado), não mostra nada
  if (!user) return null;

  return (
    <main className="min-h-screen" {...props}>
      <section className="container-global mt-10">
        <PrimaryTitle title="Selecione a empresa desejada" className="mb-3" />

        <div className="flex flex-col gap-6">
          {user.empresas.map((e) => {
            const empObj: CurrentEmpresaProps = e.empresa;
            return (
              <div
                key={e.empresa.codigo}
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
                <div>
                  <PrimaryButton
                    className="bg-red-300 border border-red-400/50 hover:bg-red-400 text-red-900"
                    icon={CheckCircle}
                    text="Entrar"
                    onClick={() => {
                      // Salva no localStorage, atualiza contexto e redireciona
                      window.localStorage.setItem("empresaStorage", empObj.id);
                      setCurrentEmpresa(empObj);
                      router.replace("/protect/home");
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
