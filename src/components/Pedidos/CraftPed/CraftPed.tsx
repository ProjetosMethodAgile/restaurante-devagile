import { AnimatePresence, motion } from "framer-motion";
import { useStep } from "../StepPedido/StepContext";
import InfoCurrentClient from "../SelectClient/InfoCurrentClient/InfoCurrentClient";
import { PlusCircle } from "lucide-react";
import ItensToOrder from "../../Main/NewPedido/ItensToOrder/ItensToOrder";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { useState } from "react";
import ModalAddItemsPed from "./ModalAddItemsPed/ModalAddItemsPed";

export type CraftPedProps = {
  produtos: ProdutoBase[] | null;
};
export default function CraftPed({ produtos }: CraftPedProps) {
  const [openAddProdModal, setopenAddProdModal] = useState(false);

  const { currentStep, currentClient } = useStep();

  return (
    <>
      <AnimatePresence mode="popLayout">
        {currentStep == 1 && currentClient && (
          <motion.div
            key="addProdPed"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              when: "beforeChildren", // entra antes dos filhos
              staggerChildren: 0.2,
            }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 p-6 rounded shadow-md flex flex-wrap justify-self-start justify-between"
            >
              <InfoCurrentClient
                currentClient={currentClient}
                className=" text-[15px]"
              />
              <div className="grid items-end bg-slate-100 lg:w-50 p-2 max-sm:w-full rounded-md">
                <div>
                  <p>
                    <b className="">Qtde items:</b> 0
                  </p>
                  <p>
                    <b className="">frete:</b> 00,00
                  </p>
                  <p className="bg-slate-200 rounded-md p-1">
                    <b className="text-[20px]">Total:</b> 00,00
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 p-6 rounded shadow-md flex flex-col"
            >
              <h1>Produtos</h1>
              <button
                className="self-center cursor-pointer flex gap-1 ring-1 ring-inset  text-primary rounded-lg p-2 hover:ring-2 active:scale-95 transition-all duration-150"
                onClick={() => setopenAddProdModal(true)}
              >
                <PlusCircle className="" /> Adicionar items ao pedido
              </button>
              <ItensToOrder produtos={produtos} />
              {/* adicionarei o itensOrder quando terminar a parte de inserir q é o modal */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {openAddProdModal && (
        <ModalAddItemsPed setopenAddProdModal={setopenAddProdModal} />
      )}
    </>
  );
}
