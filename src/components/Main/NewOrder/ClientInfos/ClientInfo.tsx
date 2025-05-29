import { Form } from "@/src/components/UI/Form";
import { Search } from "lucide-react";

export default function ClientInfo() {
  return (
    <Form.Root className="w-full bg-white rounded-xl p-4 flex flex-col gap-4">
      <Form.Section
        className="w-full flex flex-col gap-2"
        title="Informações do Cliente"
      >
        <Form.InputText
          id="cliente"
          label="Cliente"
          type="text"
          placeholder="Nome ou CPF"
          icon={Search}
          className="span-full"
        />
        <Form.InputText
          id="telefone"
          label="Telefone"
          type="text"
          placeholder="(11) 9 9999-9999"
          disabled
        />
        <Form.InputText
          id="endereco"
          label="Endereço"
          type="text"
          placeholder="Rua, Número"
          disabled
        />
        <Form.InputText
          id="bairro"
          label="Bairro"
          type="text"
          placeholder="Bairro"
          disabled
        />
        <Form.InputText
          id="cidade"
          label="Cidade"
          type="text"
          placeholder="Cidade, Estado"
          disabled
        />
        <Form.InputText
          id="complemento"
          label="Complemento"
          type="text"
          placeholder="Apto, Bloco"
          disabled
        />
        <div>
          <label className="text-text-secondary  text-sm">Observações</label>
          <textarea
            className="w-full mt-1 active:border-primary px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base disabled:bg-gray-100 disabled:hover:border-gray-300 disabled:transition-none text-text-secondary active:scale-102 ease-out  hover:border-primary/70 transition"
            name="observacao"
            id="observacao"
            placeholder="Observações"
          ></textarea>
        </div>
      </Form.Section>
    </Form.Root>
  );
}
