'use client'
import { useTransition } from "react";
import { Form } from "../../UI/Form";
import PrimaryButton from "../../UI/PrimaryButton";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Check, LoaderCircle } from "lucide-react";

export default function ProdutoForm() {
  const [isPending, startTransition] = useTransition();
  const isEditMode = true
  return (
    <Form.Root>
      <div className="border-b border-slate-200 py-4">
        <SecondaryTitle title="Informações Basicas" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
          <Form.InputText
            label="SKU"
            name="sku"
            type="text"
            placeholder="PRATO-001"
          />

          <Form.InputText
            label="Nome do Produto"
            type="text"
            placeholder="Feijoada Completa"
            name="nome_produto"
          />

          <Form.InputText
            label="Preço Base"
            type="text"
            placeholder="R$ 28,99"
            name="preco"
          />
          <Form.InputOptions
            label="Categoria"
            options={[{ label: "Comidas", value: "1" }]}
          />
          <Form.InputText
            label="Descrição"
            type="text"
            placeholder="Feijoada, Arroz, Batata..."
            name="descricao_produto"
          />
        </div>
      </div>

      <div className="border-b border-slate-200 py-4">
        <SecondaryTitle title="Variações" />
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2 mt-2">
            <input type="checkbox" name="" id="" />
            <label>Incluir variações</label>
          </div>
          <ul className="flex flex-col shadow-sm gap-4 bg-gray-100 p-4 rounded-xl">
            <li>
              {" "}
              <SecondaryTitle title="Tamanho" />
            </li>
            <li className="grid grid-cols-3 gap-4 bg-gray-100 rounded-xl">
              <Form.InputText
                label="SKU"
                name="sku"
                type="text"
                placeholder="PRATO-001"
                className="bg-white"
              />
              <Form.InputOptions
                label="Variação"
                options={[{ label: "Comidas", value: "1" }]}
                className="bg-white"
              />
              <Form.InputText
                label="Preço"
                type="text"
                placeholder="Feijoada, Arroz, Batata..."
                name="preco_variacao"
                className="bg-white"
              />
            </li>
            <li className="grid grid-cols-3 gap-4 bg-gray-100 rounded-xl">
              <Form.InputText
                label="SKU"
                name="sku"
                type="text"
                placeholder="PRATO-001"
                className="bg-white"
              />
              <Form.InputOptions
                label="Variação"
                options={[{ label: "Comidas", value: "1" }]}
                className="bg-white"
              />
              <Form.InputText
                label="Preço"
                type="text"
                placeholder="Feijoada, Arroz, Batata..."
                name="preco_variacao"
                className="bg-white"
              />
            </li>
            <li className="grid grid-cols-3 gap-4 bg-gray-100  rounded-xl">
              <Form.InputText
                label="SKU"
                name="sku"
                type="text"
                placeholder="PRATO-001"
                className="bg-white"
              />
              <Form.InputOptions
                label="Variação"
                options={[{ label: "Comidas", value: "1" }]}
                className="bg-white"
              />
              <Form.InputText
                label="Preço"
                type="text"
                placeholder="Feijoada, Arroz, Batata..."
                name="preco_variacao"
                className="bg-white"
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <PrimaryButton
          text={
            isPending ? "Salvando..." : isEditMode ? "Atualizar" : "Cadastrar"
          }
          className="bg-secondary rounded-xl hover:bg-secondary/90"
          icon={!isPending ? LoaderCircle : Check}
          type="submit"
          disabled={isPending}
          isPending
        />
      </div>
    </Form.Root>
  );
}
