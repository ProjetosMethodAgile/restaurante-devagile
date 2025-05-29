"use client";

import { useState } from "react";
import { ArrowLeft, BadgeCheck, ShoppingBasket, X } from "lucide-react";
import ClientInfo from "./ClientInfos/ClientInfo";
import ItemsToOrder from "./ItemsToOrder/ItemsToOrder";
import ItemsSearch from "./ItemsSearch/ItemSearch";
import { motion, AnimatePresence } from "framer-motion";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import OrderSummary from "./ItemsToOrder/OrderSummary";

export default function NewOrderForm() {
  const [showSearch, setShowSearch] = useState(false);

  const toggleView = () => setShowSearch((prev) => !prev);

  return (
    <section className=" overflow-y-auto rounded-xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-secondary">Novo Pedido</h2>
        <div className="flex items-center gap-4">
          <SecondaryButton
            text={showSearch ? "Voltar ao Pedido" : "Buscar Itens"}
            className="bg-secondary self-end text-blue-50 "
            icon={showSearch ? ArrowLeft : ShoppingBasket}
            onClick={toggleView}
          />
        </div>
      </div>

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
            <ClientInfo />
            <ItemsToOrder />
          </motion.div>
        ) : (
          <motion.div
            key="busca"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <ItemsSearch />
          </motion.div>
        )}
      </AnimatePresence>
      <OrderSummary />
    </section>
  );
}
