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

  return (
    <div>
      <StepPedido />
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <SelectClient clientes={clientes} userEmpresas={userEmpresas} />
        )}
        {currentStep === 1 && <AddProdutosPed />}
      </AnimatePresence>
    </div>
  );
}
