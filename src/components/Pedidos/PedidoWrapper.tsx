"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPedido from "./StepPedido/StepPedido";
import SelectClient from "./SelectClient/SelectClient";
import { useStep } from "./StepPedido/StepContext";
import type { ClienteBase } from "@/src/types/cliente/clientType";
import type { EmpresaBase } from "@/src/types/empresa/empresaType";
import AddProdutosPed from "./AddProdutosPed/AddProdutosPed";

export default function PedidoWrapper({
  clientes,
  userEmpresas,
}: {
  clientes: ClienteBase[];
  userEmpresas: EmpresaBase[];
}) {
  const { currentStep, setCurrentStep } = useStep();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, scale: 0.8 }, // evite valores negativos em scale
  };
  return (
    <div>
      <StepPedido />
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SelectClient clientes={clientes} userEmpresas={userEmpresas} />
          </motion.div>
        )}
        {currentStep === 1 && <AddProdutosPed />}
      </AnimatePresence>
    </div>
  );
}
