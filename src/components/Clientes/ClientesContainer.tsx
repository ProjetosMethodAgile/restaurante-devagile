// src/components/Clientes/ComponenteClientes.tsx
"use client";

import React, { useState } from "react";
import { ClienteBase } from "@/src/types/cliente/clientType";
import ClienteForm from "./ClienteForm/ClienteForm";
import PrimaryTitle from "../UI/PrimaryTitle";
import ClienteLista from "./ClienteLista/ClienteLista";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
import ClienteAcoes from "./ClienteAcao/ClienteAcao";
import { motion } from "framer-motion";
export type ComponenteClientesProps = {
  clientes: ClienteBase[];
  empresas: EmpresaBase[];
};

export default function ClientesContainer({
  clientes,
  empresas,
}: ComponenteClientesProps) {
  const [openModalEdit, setModalEdit] = useState<boolean>(false);
  const [clienteEdit, setClienteEdit] = useState<ClienteBase>();
  const [openModalCliente, setOpenModalCliente] = useState(false);
  const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };
  return (
    <section className="">
      <div className="flex items-center gap-4 container-global m-4 ">
        <PrimaryTitle title="Clientes" />
      </div>
      <motion.div
        key="lista"
        variants={motionProps.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
        className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md overflow- "
      >
        <ClienteLista
          clientes={clientes}
          setOpenModalCliente={setOpenModalCliente}
          setClienteEdit={setClienteEdit}
          setModalEdit={setModalEdit}
        />
      </motion.div>
      {openModalCliente && (
        <motion.div
          key="form"
          variants={motionProps.containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
          className=" flex backdrop-blur-xs absolute bg-black/70  -top-22  h-[120vh] w-full justify-center items-start pt-25 z-999 "
        >
          <ClienteForm
            setOpenModalCliente={setOpenModalCliente}
            empresas={empresas}
          />
        </motion.div>
      )}
      {openModalEdit && (
        <motion.div
          key="editclient"
          variants={motionProps.containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
          className=" flex absolute -top-22   h-[120vh] w-full justify-center items-start pt-25  "
        >
          <ClienteAcoes cliente={clienteEdit} setModalEdit={setModalEdit} />
        </motion.div>
      )}
    </section>
  );
}
