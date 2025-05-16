"use client";

import { X } from "lucide-react";
import { Form } from "../../Form";
import GenericInput from "@/src/utils/UI/GenericInput";

export default function NewOrder() {
  return (
    <section className="bg-white shadow-md rounded-xl p-8">
      <div className="flex justify-between">
        <h2 className="font-bold mb-4">Novo Pedido</h2>
        <X />
      </div>
      <Form.Root>
        <Form.Section title="Informações do Cliente">
          <Form.InputALL placeholder="Nome do Cliente" />
          <Form.InputALL placeholder="Telefone" />
        </Form.Section>
      </Form.Root>
    </section>
  );
}
