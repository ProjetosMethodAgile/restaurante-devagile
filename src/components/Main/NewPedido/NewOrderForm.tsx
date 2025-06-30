"use client";

import { useState } from "react";
import ClientInfo from "../../Pedidos/SelectClient/SelectClient";

import { motion, AnimatePresence } from "framer-motion";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import ItensToOrder from "./ItensToOrder/ItensToOrder";

type NewOrderFormProps = {
  clientes: ClienteBase[];
  produtos: ProdutoBase[] | null;
};

export default function NewOrderForm({
  clientes,
  produtos,
}: NewOrderFormProps) {
  const [showSearch, setShowSearch] = useState(false);
  const toggleView = () => setShowSearch((prev) => !prev);

  return (
    <section className="">
      <AnimatePresence mode="wait">
        {!showSearch ? (
          <motion.div
            key="pedido"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-4 py-4"
          >
            {/* <ClientInfo clientes={clientes} /> */}
            {/* <ItensToOrder produtos={produtos} /> */}
          </motion.div>
        ) : (
          <motion.div
            key="busca"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
