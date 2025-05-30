"use client";

import { CurrentEmpresaProps, useUser } from "@/src/context/userContext";
import PrimaryTitle from "../../UI/PrimaryTitle";
import { CheckCircle } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";
import { redirect } from "next/navigation";

export type ListEmpresasProps = React.ComponentProps<"div"> & {};

export default function ListEmpresas({ ...props }: ListEmpresasProps) {
  const { user, setCurrentEmpresa } = useUser();

  async function handleClick(emp: CurrentEmpresaProps) {
    setCurrentEmpresa(emp);
    redirect("protect/home");
  }
  if (user)
    return (
      <main className="min-h-screen " {...props}>
        <section className="container-global mt-10 ">
          <PrimaryTitle title="Selecione a empresa desejada" className="mb-3" />
          {user.empresas.map((e) => (
            <div
              className="bg-white shadow-md rounded-xl p-8 flex flex-wrap items-center justify-between"
              key={e.empresa.codigo}
            >
              <div className="flex flex-wrap items-center">
                <h3 className="font-semibold min-w-35">
                  {e.empresa.razao_social}
                </h3>
                <div className="text-text-secondary text-sm  flex flex-col flex-wrap justify-between">
                  <p>Cnpj: {e.empresa.cnpj}</p>
                  <p>Tipo da empresa: {e.empresa.tipoEmpresa.nome}</p>
                  <p>Situação: {e.empresa.status}</p>
                </div>
              </div>
              <div className="">
                <PrimaryButton
                  className="bg-red-300 border-1 border-red-400/50 hover:bg-red-400 text-red-900"
                  icon={CheckCircle}
                  text="Entrar"
                  onClick={() => handleClick(e.empresa)}
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    );
}
