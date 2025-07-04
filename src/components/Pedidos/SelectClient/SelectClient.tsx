"use client";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
import { useStep } from "../StepPedido/StepContext";
import { AnimatePresence, motion } from "framer-motion";
import InfoCurrentClient from "./InfoCurrentClient/InfoCurrentClient";
import ContainerCreateClient from "./ContainerCreateClient/ContainerCreateClient";
import SearchClientInput from "./SearchClientInput/SearchClientInput";
import PrimaryTitle from "../../UI/PrimaryTitle";

type ClientInfoProps = {
  clientes: ClienteBase[];
  userEmpresas: EmpresaBase[];
};

export default function SelectClient({
  clientes,
  userEmpresas,
}: ClientInfoProps) {
  const [openModalCreateCliente, setOpenModalCreateCliente] = useState(false);
  const { setCurrentStep, currentStep, currentClient, setCurrentClient } =
    useStep();

  return (
    <AnimatePresence mode="popLayout">
      {currentStep == 0 && (
        <motion.div
          key="step-0"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 relative"
        >
          <PrimaryTitle
            title="Informe o Cliente"
            className=" text-2xl font-semibold text-center text-black/80"
          />
          <SearchClientInput
            clientes={clientes}
            setOpenModalCreateCliente={setOpenModalCreateCliente}
          />
          <div className="mt-4 p-4 bg-slate-50 rounded-lg shadow-md transition-opacity duration-500 ease-in-out">
            {currentClient ? (
              <InfoCurrentClient currentClient={currentClient} />
            ) : (
              <button
                className="cursor-pointer flex gap-1 ring-1 ring-inset  text-primary rounded-lg p-2 hover:ring-2 active:scale-95 transition-all duration-150 justify-self-center"
                onClick={() => setOpenModalCreateCliente(true)}
              >
                <PlusCircle className="" /> Cadastrar novo Cliente
              </button>
            )}
          </div>

          <PrimaryButton
            text="Próximo"
            className={`self-end ${
              !currentClient &&
              "bg-gray-400 cursor-not-allowed hover:bg-gray-400 active:scale-100"
            }`}
            onClick={currentClient ? () => setCurrentStep(1) : undefined}
          />

          {openModalCreateCliente && (
            <ContainerCreateClient
              setOpenModalCreateCliente={setOpenModalCreateCliente}
              empresas={userEmpresas}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
