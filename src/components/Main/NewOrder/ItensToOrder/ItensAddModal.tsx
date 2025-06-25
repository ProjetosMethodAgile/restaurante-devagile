import { ProdutoBase } from "@/src/types/produto/produtoType";
import ItensFiltro from "./ItensFiltro";
import { useEffect, useState } from "react";
import { Form } from "@/src/components/UI/Form";
import { Banknote, Plus, ScrollText, Search, X } from "lucide-react";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import SecondaryTitle from "@/src/components/UI/SecondaryTitle";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { toast } from "react-toastify";

type ItensAddModal = {
  produtos: ProdutoBase[];
};

export default function ItensAddModal({ produtos }: ItensAddModal) {
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<ProdutoBase | null>(null);
  const [variacaoSelecionada, setVariacaoSelecionada] =
    useState<VariacaoBase | null>();

  useEffect(() => {}, [produtoSelecionado]);

  const selecionarProduto = (produto: ProdutoBase) => {
    setProdutoSelecionado(null);
    setProdutoSelecionado(produto);
  };

  const selecionarVariacao = (variacaoId: string) => {
    setVariacaoSelecionada(null);
    const variacao = produtoSelecionado?.variacoes.filter(
      (v) => v.id === variacaoId
    )[0];
    if (!variacao) return null;
    setVariacaoSelecionada(variacao);
  };

  const adicionarProduto = () => {
    if (!produtoSelecionado || !variacaoSelecionada) {
      toast.error(`Seleciona uma variação`);
      return;
    }
    toast.success(`${produtoSelecionado.nome} Adicionado ao pedido`);
    setProdutoSelecionado(null);
    setVariacaoSelecionada(null);
  };

  return (
    <div className="bg-black/80 flex justify-center items-center absolute top-0 left-0 h-[100vh] w-[100vw]">
      <div className="m-4  w-200 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <X className="self-end cursor-pointer" />
        <ItensFiltro
          selecionarProduto={selecionarProduto}
          produtos={produtos}
        />
        <div>
          {produtoSelecionado && (
            <div className="flex flex-col gap-4">
              <SecondaryTitle title={produtoSelecionado.nome} />
              <Form.InputOptions
                label="Variação"
                options={produtoSelecionado?.variacoes.map((variacao) => {
                  return { label: variacao.nome, value: variacao.id };
                })}
                className="bg-white"
                name="variacao_id"
                onChange={(e) => selecionarVariacao(e.target.value)}
                defaultValue={"teste"}
              />
            </div>
          )}
          {variacaoSelecionada && (
            <div>
              <Form.InputText
                id="preco_variacao"
                label="Preço R$"
                type="text"
                placeholder=""
                icon={Banknote}
                className="span-full"
                value={variacaoSelecionada.preco}
                disabled
              />
              <Form.InputText
                id="quantidade"
                label="Quantidade"
                type="number"
                placeholder="0"
                className="span-full"
              />
              <Form.InputText
                id="observação"
                label="Observação"
                type="text"
                placeholder=""
                icon={ScrollText}
                className="span-full"
              />
              <SecondaryButton
                className="bg-secondary w-full mt-4 text-white"
                text="Adicionar"
                icon={Plus}
                onClick={adicionarProduto}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
