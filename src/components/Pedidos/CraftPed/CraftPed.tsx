import { AnimatePresence, motion } from "framer-motion";
import { useStep } from "../StepPedido/StepContext";
import InfoCurrentClient from "../SelectClient/InfoCurrentClient/InfoCurrentClient";
import { PlusCircle, ShoppingCart } from "lucide-react";
import ItensToOrder from "../../Main/NewPedido/ItensToOrder/ItensToOrder";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { useState } from "react";
import ModalAddItemsPed from "./ModalAddItemsPed/ModalAddItemsPed";
import PrimaryTitle from "../../UI/PrimaryTitle";

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
              className="bg-slate-50 p-6 rounded shadow-md flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <PrimaryTitle title="Produtos" className="mb-2 text-lg" />

                <button
                  className="self-center cursor-pointer flex gap-1 ring-1 ring-inset  text-primary rounded-lg p-2 hover:ring-2 active:scale-95 transition-all duration-150"
                  onClick={() => setopenAddProdModal(true)}
                >
                  <PlusCircle className="" /> Adicionar items
                </button>
              </div>
              <div className="bg-slate-100 rounded-md p-2">
                <div className="flex flex-col justify-center items-center  p-2">
                  <ShoppingCart className="size-10 text-gray-400" />
                  <p className="text-gray-400">Nenhum item adicionado</p>
                </div>
              </div>
              <ItensToOrder produtos={produtos} />
              {/* adicionarei o itensOrder quando terminar a parte de inserir q é o modal */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {openAddProdModal && (
        <ModalAddItemsPed
          setopenAddProdModal={setopenAddProdModal}
          produtos={produtos}
        />
      )}
    </>
  );
}
