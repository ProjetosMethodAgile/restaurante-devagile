"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPedido from "./StepPedido/StepPedido";
import SelectClient from "./SelectClient/SelectClient";
import { useStep } from "./StepPedido/StepContext";
import type { ClienteBase } from "@/src/types/cliente/clientType";
import type { EmpresaBase } from "@/src/types/empresa/empresaType";
import CraftPed from "./CraftPed/CraftPed";
import { ProdutoBase } from "@/src/types/produto/produtoType";

export default function PedidoWrapper({
  clientes,
  userEmpresas,
  produtos,
}: {
  clientes: ClienteBase[];
  userEmpresas: EmpresaBase[];
  produtos: ProdutoBase[] | null;
}) {
  return (
    <div className="mx-2">
      <div className="bg-white flex flex-col gap-6 p-10 rounded-xl shadow-md container-global">
        <div className="lg:w-200 m-auto">
          <StepPedido />
          <SelectClient clientes={clientes} userEmpresas={userEmpresas} />
          {produtos && <CraftPed produtos={produtos} />}
        </div>
      </div>
    </div>
  );
}
