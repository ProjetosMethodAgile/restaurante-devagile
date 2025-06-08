// src/components/Clientes/ComponenteClientes.tsx
'use client';
import ContainerClientes from "./ContainerClientes";
import FormCliente from "./FormCliente";
import { FormClienteData } from "@/src/types/cliente/clientType";
import { useState } from "react";

export type ComponenteClientesProps = {
  id:string;
  clientes: FormClienteData[];
};

export type ComponenteClientesState = FormClienteData & {
  status: boolean;
};

export default function ComponenteClientes({ clientes }: ComponenteClientesProps) {
  const [dataAlteredUser, setDataAlteredUser] = useState<ComponenteClientesState[]>([]);



  return (
    <div className="flex flex-col gap-4 p-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#1F2D5C]">
        Lista de clientes
      </h2>

      {/* mobile: coluna única
          md (≥768px): duas colunas iguais (1/2 + 1/2)
          lg (≥1024px): lista 2/3 + form 1/3 */}
      <div className="flex flex-col md:flex-row w-full gap-4">
        <section className="w-full md:w-1/2 lg:w-2/3 bg-white rounded-lg shadow p-4">
          <ContainerClientes
            clientes={clientes}
            dataAlteredUser={dataAlteredUser}
            setDataAlteredUser={setDataAlteredUser}
          />
        </section>

        <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvh">
          <FormCliente
            dataAlteredUser={dataAlteredUser}
            setDataAlteredUser={setDataAlteredUser}
          />
        </section>
      </div>
    </div>
  );
}
