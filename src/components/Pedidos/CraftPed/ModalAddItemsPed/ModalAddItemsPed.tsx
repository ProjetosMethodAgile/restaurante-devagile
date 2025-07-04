import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SearchProductInput from "./SearchProductInput/SearchProductInput";
import SearchVariabeInput from "./SearchVariabeInput/SearchVariabeInput";
import React from "react";
import type { ProdutoBase } from "@/src/types/produto/produtoType";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import FormInput from "@/src/components/UI/Form/FormInput";

export type ModalAddItemsPedProps = React.ComponentProps<"div"> & {
  setopenAddProdModal: React.Dispatch<React.SetStateAction<boolean>>;
  produtos: ProdutoBase[] | null;
};

export default function ModalAddItemsPed({
  setopenAddProdModal,
  produtos,
  ...props
}: ModalAddItemsPedProps) {
  const [currentProduto, setCurrentProduto] =
    React.useState<ProdutoBase | null>(null);
  const [currentVariable, setCurrentVariable] =
    React.useState<VariacaoBase | null>(null);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center  justify-center z-50 overflow-auto"
      {...props}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ stiffness: 200, damping: 20 }}
        className="bg-white rounded-lg shadow-lg lg:w-200 max-h-[90vh]  min-h-70 mx-5 px-10 py-6 overflow-visible"
      >
        <div className="flex gap-5 items-center">
          <ArrowLeft
            onClick={() => setopenAddProdModal(false)}
            className="pl-2 text-blue-800 active:scale-105 hover:scale-102 cursor-pointer size-10"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Adicionar itens ao pedido
          </h1>
        </div>

        <SearchProductInput
          produtos={produtos ?? []}
          setCurrentProduto={setCurrentProduto}
        />
        {currentProduto && (
          <SearchVariabeInput
            currentProduto={currentProduto}
            setCurrentVariable={setCurrentVariable}
          />
        )}
        {currentVariable && currentProduto && (
          <FormInput
            type="number"
            label="Quantidade"
            placeholder="informe a quantidade"
          />
        )}
      </motion.div>
    </div>
  );
}
