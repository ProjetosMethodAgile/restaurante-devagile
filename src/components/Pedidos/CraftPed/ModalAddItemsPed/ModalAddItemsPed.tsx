import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SearchProductInput from "./SearchProductInput/SearchProductInput";
import SearchVariabeInput from "./SearchVariabeInput/SearchVariabeInput";
import React from "react";
import type { ProdutoBase } from "@/src/types/produto/produtoType";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import FormInput from "@/src/components/UI/Form/FormInput";
import PrimaryButton from "@/src/components/UI/PrimaryButton";

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
  const [currentQuantity, setCurrentQuantity] = React.useState("");

  const [produtoObservacao, setProdutoObservacao] =
    React.useState<[{ index: string; observacao: string }]>();

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
          setCurrentQuantity={setCurrentQuantity}
        />
        {currentProduto && (
          <SearchVariabeInput
            currentProduto={currentProduto}
            setCurrentVariable={setCurrentVariable}
            setCurrentQuantity={setCurrentQuantity}
          />
        )}
        {currentVariable && currentProduto && (
          <FormInput
            type="number"
            label="Quantidade"
            placeholder="informe a quantidade"
            min={1}
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.currentTarget.value)}
          />
        )}
        <motion.div className="overflow-auto max-h-50 mt-5">
          {currentQuantity &&
            Array.from({ length: +currentQuantity }).map((_, index) => (
              <>
                <label className="text-text-secondary  text-sm ">
                  item {index + 1} observação:
                </label>
                <textarea
                  key={index + 1}
                  className="resize-none flex py-2 px-4 items-center transition justify-between border rounded-lg text-sm sm:text-base text-text-secondary ease-out hover:border-primary/70 z-10 active:ring-2 ring-red-200 active:border-primary itens-center gap-2 focus:ring-red-200 focus:outline-none focus:ring-2  w-full border-gray-300"
                  id=""
                />
              </>
            ))}
        </motion.div>

        <div className="flex justify-self-end mt-2 gap-2">
          <PrimaryButton
            text="Adicionar +"
            className={`${
              !currentQuantity || !currentProduto || !currentVariable
                ? "bg-gray-400 disabled cursor-not-allowed hover:bg-gray-400"
                : "bg-blue-500  hover:bg-blue-700"
            }  `}
          />
          <PrimaryButton
            text="Finalizar"
            className={`${
              !currentQuantity || !currentProduto || !currentVariable
                ? "bg-gray-400 disabled cursor-not-allowed hover:bg-gray-400"
                : "bg-green-500 hover:bg-green-700"
            } `}
          />
        </div>
      </motion.div>
    </div>
  );
}
