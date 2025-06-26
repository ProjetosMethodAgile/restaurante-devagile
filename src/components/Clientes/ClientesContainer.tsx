// src/components/Clientes/ComponenteClientes.tsx
'use client';
import ContainerClientes from "./ClientesLista_/ClientesLista";
import React, { useState } from "react";
import { ClienteBase } from '@/src/types/cliente/clientType';
import ClienteForm from "./ClienteForm/ClienteForm";
import PrimaryTitle from "../UI/PrimaryTitle";
import ClienteLista from "./ClienteLista/ClienteLista";
import { EmpresaBase } from "@/src/types/empresa/empresaType";

export type ComponenteClientesProps = {
  clientes: ClienteBase[];
  empresas: EmpresaBase[];
};


export default function ClientesContainer({ clientes,empresas }: ComponenteClientesProps) {

  const [openModalCliente,setOpenModalCliente]=useState(false)

  return (
     <section className="">
        <div className="flex items-center gap-4 container-global m-4">
          <PrimaryTitle title="Clientes" />
        </div>
        <div className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md">
         <ClienteLista clientes={clientes} setOpenModalCliente={setOpenModalCliente}/>
        </div>
       { openModalCliente&&
       <div className=" flex bg-black/50 absolute -top-20  h-[120vh] w-full justify-center items-start pt-25 ">
        <ClienteForm setOpenModalCliente={setOpenModalCliente} empresas={empresas}/>
        </div>
        }
      </section>
  );
}

  