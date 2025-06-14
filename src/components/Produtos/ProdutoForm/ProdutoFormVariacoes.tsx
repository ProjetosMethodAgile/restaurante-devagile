import { Plus, Trash2Icon } from "lucide-react";
import { Form } from "../../UI/Form";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { VariacaoState } from "./ProdutoForm";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import { Dispatch, SetStateAction } from "react";

type ProdutoVariacoesProps = {
  variacoesData: VariacaoState[];
  setPrecoBase: (checked: boolean) => void;
  variacoes: VariacaoBase[];
  handleChange: (
    idx: number,
    target: EventTarget & {
      name?: string;
      value?: string;
    }
  ) => void;
  addVariacao: () => void;
  setTipoProduto?: Dispatch<SetStateAction<string>>
  tipoProduto?: string;
};

export default function ProdutoFormVariacoes({
  variacoesData,
  setPrecoBase,
  variacoes,
  handleChange,
  addVariacao,
  tipoProduto = "unico",
}: ProdutoVariacoesProps) {
  if(tipoProduto === "unico") return null
  
  return (
    <div className="border-b border-slate-200 py-4">
      <div className="flex flex-col gap-4 ">
        <ul className="flex flex-col shadow-sm gap-4 bg-gray-100 p-4 rounded-xl">
          <li className="flex justify-between">
            <SecondaryTitle title="Variações" />
            <div>
              {variacoesData.length > 0 && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="incluir_preco_base"
                    id="incluir_preco_base"
                    onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                      setPrecoBase((e.target as HTMLInputElement).checked)
                    }
                  />
                  <label htmlFor="incluir_preco_base">
                    Utilizar preço base
                  </label>
                </div>
              )}
            </div>
          </li>
          {variacoesData.map((variacao, idx) => {
            return (
              <li
                key={idx}
                className="grid grid-cols-[auto_1fr_1fr_1fr_auto] border-b-2 border-gray-200/80 pb-4 items-center gap-4 bg-gray-100 "
              >
                <span className="text-slate-700 text-sm "># {idx + 1}</span>

                <Form.InputOptions
                  label="Variação"
                  options={variacoes.map((variacao) => {
                    console.log(variacoes);
                    return { label: variacao.nome, value: variacao.id };
                  })}
                  className="bg-white"
                  value={variacao.variacao_id}
                  onChange={(e) => handleChange(idx, e.target)}
                  name="variacao_id"
                />
                <Form.InputText
                  label="Preço"
                  type="text"
                  placeholder="R$"
                  name="variacao_preco"
                  className="bg-white"
                  value={variacao.variacao_preco}
                  onChange={(e) => handleChange(idx, e.target)}
                />
                <Trash2Icon className="mt-4 cursor-pointer hover:scale-102 transition-all text-primary" />
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
