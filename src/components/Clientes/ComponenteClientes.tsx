// src/components/Clientes/ComponenteClientes.tsx
'use client'
import ContainerClientes from "./ContainerClientes";
import FormCliente from "./FormCliente";
import { FormClienteData } from "@/src/types/cliente/clientType";
import { useState } from "react";

export type ComponenteClientesProps = {
  clientes: FormClienteData[];
};

export type ComponenteClientesState = FormClienteData & {
  status: boolean;
};

export default function ComponenteClientes({ clientes }: ComponenteClientesProps) {
  const [dataAlteredUser, setDataAlteredUser] = useState<ComponenteClientesState[]>([]);

  return (
    <div className="flex flex-col  gap-6 p-4 h-auto lg:h-screen container-global items-start ">
      {/* Lista de clientes já tem o título dentro de ContainerClientes */}
      
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2D5C] mb-2 mt-2  ">
        Lista de clientes
      </h2>
      <div className="flex flex-col lg:flex-row w-full gap-4 h-full items-start">

      <section className="w-full lg:w-2/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto shadow-mb">
        <ContainerClientes
          clientes={clientes}
          dataAlteredUser={dataAlteredUser}
          setDataAlteredUser={setDataAlteredUser}
          />
      </section>

      <section className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto">
        <FormCliente
          dataAlteredUser={dataAlteredUser}
          setDataAlteredUser={setDataAlteredUser}
          />
      </section>
          </div>
    </div>
  );
}
