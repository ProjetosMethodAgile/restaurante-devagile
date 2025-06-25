// src/components/Clientes/ComponenteClientes.tsx
'use client';
import ContainerClientes from "./ClientesLista_/ClientesLista";
import React, { useState } from "react";
import { ClienteBase } from '@/src/types/cliente/clientType';
import ClienteForm from "./ClienteForm_/ClienteForm";
import PrimaryTitle from "../UI/PrimaryTitle";
import ClienteLista from "./ClienteLista/ClienteLista";

export type ComponenteClientesProps = {
  clientes: ClienteBase[];
};


export default function ClientesContainer({ clientes }: ComponenteClientesProps) {
  const [dataAlteredUser, setDataAlteredUser] = useState("");
  const [edita,setEdita]=React.useState<boolean>(false)

  return (
     <section>
        <div className="flex items-center gap-4 container-global m-4">
          <PrimaryTitle title="Clientes" />
        </div>
        <div className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md">
         <ClienteLista clientes={clientes}/>
        </div>
      </section>
  );
}

      // <h2 className="text-2xl font-semibold text-[#1F2D5C]">
      //   Lista de clientes
      // </h2>

      // <div className="flex flex-col md:flex-row w-full gap-4">
      //   <section className="w-full md:w-1/2 lg:w-2/3 bg-white rounded-lg shadow p-4">
      //     <ContainerClientes
      //       clientes={clientes}
      //       setDataAlteredUser={setDataAlteredUser}
      //       setEdita={setEdita}
      //       edita={edita}
      //     />
      //   </section>

      //   <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvh">
      //     <ClienteForm
      //       setEdita = {setEdita}
      //       edita = {edita}
      //       dataAlteredUser={dataAlteredUser}
      //     />
      //   </section>
      // </div>