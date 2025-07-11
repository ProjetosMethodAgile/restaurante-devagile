import { motion } from "framer-motion";
import React from "react";
import { Search, X } from "lucide-react";
import { Form } from "@/src/components/UI/Form";

import { ProdutoBase } from "@/src/types/produto/produtoType";

export type SearchProductInputProps = React.ComponentProps<"div"> & {
  produtos: ProdutoBase[] | [];
  setCurrentProduto: React.Dispatch<React.SetStateAction<ProdutoBase | null>>;
  setCurrentQuantity: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchProductInput({
  produtos,
  setCurrentProduto,
  setCurrentQuantity,
}: SearchProductInputProps) {
  const [filteredproduto, setFilteredProduto] =
    React.useState<ProdutoBase[]>(produtos);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchList, setSearchList] = React.useState<boolean>(false);

  function buscaProduto(value: string) {
    setSearchTerm(value);
    if (!value) {
      setSearchList(false);
      setFilteredProduto(produtos);
      return;
    }
    const lower = value.toLowerCase();
    setFilteredProduto(
      produtos.filter((c) => c.nome.toLowerCase().includes(lower))
    );
    setSearchList(true);
  }

  function carregaProduto(produtoId: string) {
    const found = produtos.find((c) => c.id === produtoId) || null;
    setCurrentProduto(found);
    setSearchTerm(found ? found.nome : "");
    setSearchList(false);
  }
  return (
    <div className="relative">
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          title="apagar texto"
          onClick={() => {
            setCurrentProduto(null);
            setSearchTerm("");
            setSearchList(false);
            buscaProduto("");
            setCurrentQuantity("");
          }}
          className="text-primary absolute left-[-25] bottom-[7] cursor-pointer hover:text-700 hover:scale-110 transition-all duration-150"
        >
          <X />
        </motion.div>
      )}
      <Form.InputText
        id="busca-produto"
        label="Buscar Produto"
        type="text"
        placeholder="ex: batata..."
        icon={Search}
        className="span-full"
        value={searchTerm}
        onChange={(e) => buscaProduto(e.target.value)}
        onClick={(e) => {
          setSearchList((e) => !e),
            searchTerm && buscaProduto(e.currentTarget.value);
        }}
      />
      {searchList && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-md z-30"
        >
          <ul>
            {filteredproduto.length > 0 ? (
              filteredproduto.map((produto) => (
                <li
                  key={produto.id}
                  className="flex cursor-pointer items-center gap-1 px-3 py-2 hover:bg-gray-100 hover:rounded-lg transition overflow-x-hidden border-b-1 border-slate-100"
                  onClick={() => carregaProduto(produto.id)}
                >
                  <div className="lg:size-20 flex justify-center items-center bg-slate-300 rounded-md ">
                    <span className="text-sm">cod.: {produto.codigo}</span>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    <span
                      className="w-80 truncate font-semibold"
                      title={produto.nome}
                    >
                      {produto.codigo} {produto.nome}
                    </span>
                    <div className="w-80 flex gap-2">
                      {produto.variacoes.map((i, idx) => (
                        <span
                          key={idx}
                          className="truncate bg-slate-300 rounded-md py-1 px-2 text-sm text-gray-700"
                        >
                          {i.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-text-secondary hover:bg-gray-100 flex gap-2 flex-wrap items-center justify-between">
                <p className="cursor-default"> Nenhum produto encontrado</p>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
