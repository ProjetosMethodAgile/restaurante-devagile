import { Form } from "@/src/components/UI/Form";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ClientFiltro from "./ClienteFiltro";

type ClientInfoProps = {
  clientes: ClienteBase[] | [];
};

export default function ClienteInfo({ clientes }: ClientInfoProps) {
  const [filteredClientes, setFilteredClientes] =
    useState<ClienteBase[]>(clientes);
  const [currentClient, setCurrentClient] = useState<ClienteBase | null>(null);
  const [searchList, setSearchList] = useState(false);

  const carregaCliente = (clientId: string) => {
    const cliente = clientes.find((c) => c.id === clientId);
    if (!cliente) {
      setCurrentClient(null);
      return;
    }
    setSearchList(false);
    setCurrentClient(cliente || null);
  };

  const buscaCliente = (value: string) => {
    setSearchList(true);
    setCurrentClient(null);
    if (!value) {
      setSearchList(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(lowerValue) ||
        cliente.cpf?.includes(lowerValue)
    );

    setFilteredClientes(filtered);
  };

  useEffect(() => {
    if (filteredClientes.length === 0) {
      setSearchList(false);
    }
  }, [searchList]);

  return (
    <Form.Root className="w-full bg-white rounded-xl flex flex-col gap-4">
      <Form.Section
        className="w-full flex flex-col gap-2"
        title="Informações do Cliente"
      >
        <ClientFiltro
          buscaCliente={buscaCliente}
          carregaCliente={carregaCliente}
          filteredClientes={filteredClientes}
          searchList={searchList}
        />
        <Form.InputText
          id="cliente"
          label="Cliente"
          type="text"
          placeholder="João da Silva"
          disabled
          value={currentClient ? currentClient.nome : ""}
        />
        <Form.InputText
          id="telefone"
          label="Telefone"
          type="text"
          placeholder="(11) 9 9999-9999"
          disabled
          value={currentClient ? currentClient.contato : ""}
        />
        <Form.InputText
          id="endereco"
          label="Endereço"
          type="text"
          placeholder="Rua, Número"
          disabled
          value={currentClient ? currentClient.rua : ""}
        />
        <Form.InputText
          id="bairro"
          label="Bairro"
          type="text"
          placeholder="Bairro"
          disabled
          value={currentClient ? currentClient.bairro : ""}
        />
        <Form.InputText
          id="cidade"
          label="Cidade"
          type="text"
          placeholder="Cidade, Estado"
          disabled
          value={currentClient ? currentClient.cidade : ""}
        />
        <Form.InputText
          id="complemento"
          label="Complemento"
          type="text"
          placeholder="Apto, Bloco"
          disabled
          value={currentClient ? currentClient.complemento : ""}
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
