"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "../../UI/Form";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { currentProdutoType } from "./ProdutoForm";
import { NumericFormat } from "react-number-format";

type ProdutoInfoFormProps = {
  categorias: CategoriaBase[] | [];
  currentProduto: currentProdutoType | null;
  setCurrentProduto: Dispatch<SetStateAction<currentProdutoType | null>>;
};



export default function ProdutoInfoForm({
  categorias,
  currentProduto = null,
  setCurrentProduto,
}: ProdutoInfoFormProps) {
  const isTipoProduto = (tipo: any): tipo is "unico" | "variavel" => {
    return tipo === "unico" || tipo === "variavel";
  };


  return (
    <div className="border-b border-slate-200 py-4">
      <SecondaryTitle title="Informações Basicas" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
        <Form.InputText
          label="SKU"
          name="codigo"
          type="text"
          placeholder="PRATO-001"
          value={currentProduto?.codigo || ""}
          onChange={(e) => {
            if (!currentProduto) return;
            setCurrentProduto({ ...currentProduto, codigo: e.target.value });
          }}
        />

        <Form.InputText
          label="Nome do Produto"
          type="text"
          placeholder="Feijoada Completa"
          name="nome"
          value={currentProduto?.nome || ""}
          onChange={(e) => {
            if (!currentProduto) return;
            setCurrentProduto({ ...currentProduto, nome: e.target.value });
          }}
        />

        <NumericFormat
          label={`Preço ${currentProduto?.tipo_produto === 'variavel' ? '*Defina nas variações' : ''}`}
          customInput={Form.InputText}
          name="preco_base"
          placeholder="R$ 0,00"
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          value={currentProduto?.preco || ""}
          onValueChange={(values) => {
            if (!currentProduto) return;

            setCurrentProduto({
              ...currentProduto,
              preco: values.value,
            });
            console.log(currentProduto)
          }}
          disabled={currentProduto?.tipo_produto === 'variavel'}
        />

        <Form.InputOptions
          label="Categoria"
          name="categoria"
          options={categorias.map((categoria) => {
            return { label: categoria.nome, value: categoria.id };
          })}
          onChange={(e) => {
            if (!currentProduto) return;
            setCurrentProduto({
              ...currentProduto,
              categoria_id: e.target.value,
            });
          }}
          value={currentProduto?.categoria_id || ""}
        />

        <Form.InputText
          label={`Descrição do produto (${currentProduto?.descricao.length}/80)`}
          type="text"
          placeholder="Feijoada, Arroz, Batata..."
          name="descricao"
          maxLength={80}
          onChange={(e) => {
            if (!currentProduto) return;
            setCurrentProduto({ ...currentProduto, descricao: e.target.value });
          }}
          value={currentProduto?.descricao || ""}
        />
        <Form.InputOptions
          label="Tipo do produto"
          name="tipo_produto"
          options={[
            { label: "Único", value: "unico" },
            { label: "Variável", value: "variavel" },
          ]}
          value={currentProduto?.tipo_produto || "unico"}
          onChange={(e) => {
            if (!currentProduto) return;
            if (!isTipoProduto(e.target.value)) return;
            setCurrentProduto({
              ...currentProduto,
              tipo_produto: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}
