import ClienteForm from "@/src/components/Clientes/ClienteForm/ClienteForm";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
import { motion } from "framer-motion";
import React from "react";

export type ContainerCreateClientProps = React.ComponentProps<"div"> & {
  empresas: EmpresaBase[];
  setOpenModalCreateCliente: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContainerCreateClient({
  empresas,
  setOpenModalCreateCliente,
  ...props
}: ContainerCreateClientProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto p-6"
      >
        <ClienteForm
          setOpenModalCliente={setOpenModalCreateCliente}
          empresas={empresas}
        />
      </motion.div>
    </div>
  );
}
