"use client";

import { Search, X } from "lucide-react";
import { Form } from "../../Form";
import GenericInput from "@/src/utils/UI/GenericInput";

export default function NewOrder() {
  return (
    <section className="bg-white shadow-md rounded-xl p-8">
      <div className="flex justify-between">
        <h2 className="font-bold mb-2">Novo Pedido</h2>
        <X />
      </div>
      <Form.Root>
        <Form.Section title="Informações do Cliente">
          <Form.InputALL
            id="cliente"
            label="Cliente"
            type="text"
            placeholder="Nome ou CPF"
            icon={Search}
          />
          <Form.InputALL
            id="telefone"
            label="Telefone"
            type="text"
            placeholder="(11) 9 9999-9999"
            disabled
          />
          <Form.InputALL
            id="endereco"
            label="Endereço"
            type="text"
            placeholder="Rua, Número"
            disabled
          />
          <Form.InputALL
            id="bairro"
            label="Bairro"
            type="text"
            placeholder="Bairro"
            disabled
          />
          <Form.InputALL
            id="cidade"
            label="Cidade"
            type="text"
            placeholder="Cidade, Estado"
            disabled
          />
          <Form.InputALL
            id="complemento"
            label="Complemento"
            type="text"
            placeholder="Apto, Bloco"
            disabled
          />
          <textarea
            className="w-full mt-4 active:border-primary px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base disabled:bg-gray-100 disabled:hover:border-gray-300 disabled:transition-none text-text-secondary active:scale-102 ease-out  hover:border-primary/70 transition"
            name="observacao"
            id="observacao"
            placeholder="Observações"
          ></textarea>
        </Form.Section>
      </Form.Root>
    </section>
  );
}
