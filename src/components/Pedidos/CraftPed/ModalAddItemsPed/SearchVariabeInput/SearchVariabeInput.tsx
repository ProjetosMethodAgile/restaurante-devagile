import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { ArrowBigDown, X } from "lucide-react";
import { Form } from "@/src/components/UI/Form";

import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import { ProdutoBase } from "@/src/types/produto/produtoType";

export type SearchVariabeInputProps = {
  currentProduto: ProdutoBase;
  setCurrentVariable: React.Dispatch<React.SetStateAction<VariacaoBase | null>>;
  setCurrentQuantity: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchVariabeInput({
  currentProduto,
  setCurrentVariable,
  setCurrentQuantity,
}: SearchVariabeInputProps) {
  const variables: VariacaoBase[] = currentProduto.variacoes;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchList, setSearchList] = React.useState<boolean>(false);

  useEffect(() => {
    setSearchTerm("");
  }, [currentProduto]);

  if (variables)
    return (
      <div className="relative">
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            title="apagar texto"
            onClick={() => {
              setSearchTerm("");
              setSearchList(false);
              setCurrentVariable(null);
              setCurrentQuantity("1");
            }}
            className="text-primary absolute left-[-25] bottom-[7] cursor-pointer hover:text-700 hover:scale-110 transition-all duration-150"
          >
            <X />
          </motion.div>
        )}
        <Form.InputText
          id="busca-variable"
          label="Tamanho"
          type="text"
          placeholder="selecione um tamanho"
          icon={ArrowBigDown}
          className="cursor-pointer caret-transparent"
          value={searchTerm}
          onChange={() => setSearchTerm(searchTerm)}
          onClick={(e) => {
            setSearchList((e) => !e);
          }}
        />
        {searchList && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-1 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-md z-30"
          >
            <ul>
              {variables.length > 0 ? (
                variables.map((variable, idx) => (
                  <li
                    key={idx}
                    className="flex cursor-pointer items-center gap-1 px-3 py-2 hover:bg-gray-100 hover:rounded-lg transition overflow-x-hidden border-b-1 border-slate-100"
                    onClick={() => {
                      setSearchTerm(`${variable.nome} - R$ ${variable.preco}`);
                      setSearchList(false);
                      setCurrentVariable(variable);
                    }}
                  >
                    <span className="w-80 truncate" title={variable.nome}>
                      {variable.nome} - R$ {variable.preco}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-text-secondary hover:bg-gray-100 flex gap-2 flex-wrap items-center justify-between">
                  <p className="cursor-default"> Nenhuma variavel encontrada</p>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    );
}
