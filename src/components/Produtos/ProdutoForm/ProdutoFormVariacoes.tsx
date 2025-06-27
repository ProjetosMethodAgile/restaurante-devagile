import { ConstructionIcon, Plus, Trash2Icon } from "lucide-react";
import { Form } from "../../UI/Form";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { currentProdutoType, VariacaoState } from "./ProdutoForm";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import { Dispatch, SetStateAction } from "react";

type ProdutoVariacoesProps = {
  variacoesData: VariacaoState[];
  setPrecoBase: (checked: boolean) => void;
  variacoes: VariacaoBase[];
  addVariacao: () => void;

  currentProduto: currentProdutoType | null;
  setCurrentProduto: Dispatch<SetStateAction<currentProdutoType | null>>;
};

export default function ProdutoFormVariacoes({
  variacoes,
  addVariacao,
  currentProduto = null,
  setCurrentProduto,
}: ProdutoVariacoesProps) {
  if (currentProduto?.tipo_produto === "unico") return null;

  function handleVariacaoChange(
    idx: number,
    target: EventTarget & { name?: string; value?: string }
  ) {
    const { name, value } = target;
    if (!name) return;

    setCurrentProduto((prev) => {
      if (!prev) return prev;

      const novasVariacoes = [...prev.variacoes];
      novasVariacoes[idx] = {
        ...novasVariacoes[idx],
        [name]: value, // name pode ser 'id' ou 'preco'
      };
      
      return {
        ...prev,
        variacoes: novasVariacoes,
      };
    });
  }

  function deletaVariacao(idx: number) {
    setCurrentProduto((prev) => {
      if (!prev) return prev;

      const novasVariacoes = [...prev.variacoes];
      novasVariacoes.splice(idx, 1);

      return {
        ...prev,
        variacoes: novasVariacoes,
      };
    });
  }

  return (
    <div className="border-b border-slate-200 py-4">
      <div className="flex flex-col gap-4 ">
        <ul className="flex flex-col shadow-sm gap-4 bg-gray-100 p-4 rounded-xl">
          <li className="flex justify-between">
            <SecondaryTitle title="Variações" />
          </li>
          {currentProduto?.variacoes.map((variacao, idx) => {
            console.log("variacao", variacao);
            return (
              <li
                key={idx}
                className="grid grid-cols-[auto_1fr_1fr_1fr_auto] border-b-2 border-gray-200/80 pb-4 items-center gap-4 bg-gray-100 "
              >
                <span className="text-slate-700 text-sm "># {idx + 1}</span>
                <Form.InputOptions
                  label="Variação"
                  options={
                    variacoes.map((variacao) => {
                    return { label: variacao.nome, value: variacao.id };
                  })}
                  className="bg-white"
                  value={currentProduto?.variacoes[idx].variacao_id || ""}
                  onChange={(e) => handleVariacaoChange(idx, e.target)}
                  name="variacao_id"
                />
                <Form.InputText
                  label="Preço"
                  type="text"
                  placeholder="R$"
                  name="variacao_preco"
                  className="bg-white"
                  value={currentProduto?.variacoes[idx].variacao_preco || ""}
                  onChange={(e) => handleVariacaoChange(idx, e.target)}
                />
                <Trash2Icon onClick={()=> deletaVariacao(idx)} className="mt-4 cursor-pointer hover:scale-102 transition-all text-primary" />
              </li>
            );
          })}
          <li
            onClick={addVariacao}
            className="bg-secondary gap-2 items-center flex cursor-pointer hover:scale-102 transition-all rounded-xl mx-auto p-2 text-white mt-2"
          >
            <span>Adicionar Variação</span>
            <Plus />
          </li>
        </ul>
      </div>
    </div>
  );
}
