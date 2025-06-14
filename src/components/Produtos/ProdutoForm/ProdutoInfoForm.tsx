"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "../../UI/Form";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";

type ProdutoInfoFormProps = {
  preco: string;
  setPreco: Dispatch<SetStateAction<string>>;
  categorias: CategoriaBase[] | [];
  setTipoProduto?: Dispatch<SetStateAction<string>>;
};

export default function ProdutoInfoForm({
  preco,
  setPreco,
  categorias,
  setTipoProduto,
}: ProdutoInfoFormProps) {
  const [descricaoLength, setDescricaoLength] = useState(0);
  return (
    <div className="border-b border-slate-200 py-4">
      <SecondaryTitle title="Informações Basicas" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
        <Form.InputText
          label="SKU"
          name="codigo"
          type="text"
          placeholder="PRATO-001"
        />

        <Form.InputText
          label="Nome do Produto"
          type="text"
          placeholder="Feijoada Completa"
          name="nome"
        />

        <Form.InputText
          label="Preço Base"
          type="text"
          placeholder="R$"
          name="preco_base"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <Form.InputOptions
          label="Categoria"
          name="categoria"
          options={categorias.map((categoria) => {
            return { label: categoria.nome, value: categoria.id };
          })}
        />

        <Form.InputText
          label={`Descrição do produto (${descricaoLength}/80)`}
          type="text"
          placeholder="Feijoada, Arroz, Batata..."
          name="descricao"
          maxLength={80}
          onChange={(e) => setDescricaoLength(e.target.value.length)}
        />
        <Form.InputOptions
          label="Tipo do produto"
          name="tipo_produto"
          defaultValue={{ label: "Unico", value: "unico" }}
          options={[{ label: "Variavel", value: "variavel" }]}
          onChange={(e) => setTipoProduto && setTipoProduto(e.target.value)}
        />
      </div>
    </div>
  );
}
