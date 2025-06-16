// src/components/Clientes/ComponenteClientes.tsx
'use client';
import ContainerClientes from "./ClientesLista/ClientesLista";
import React, { useState } from "react";
import { ClienteBase } from '@/src/types/cliente/clientType';
import ClienteForm from "./ClienteForm/ClienteForm";

export type ComponenteClientesProps = {
  clientes: ClienteBase[];
};


export default function ClientesContainer({ clientes }: ComponenteClientesProps) {
  const [dataAlteredUser, setDataAlteredUser] = useState("");
  const [edita,setEdita]=React.useState<boolean>(false)

  return (
    <div className="flex flex-col gap-4 p-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#1F2D5C]">
        Lista de clientes
      </h2>

      <div className="flex flex-col md:flex-row w-full gap-4">
        <section className="w-full md:w-1/2 lg:w-2/3 bg-white rounded-lg shadow p-4">
          <ContainerClientes
            clientes={clientes}
            setDataAlteredUser={setDataAlteredUser}
            setEdita={setEdita}
            edita={edita}
          />
        </section>

        <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvh">
          <ClienteForm
   
            setEdita = {setEdita}
            edita = {edita}
            dataAlteredUser={dataAlteredUser}
          />
        </section>
      </div>
    </div>
  );
}
