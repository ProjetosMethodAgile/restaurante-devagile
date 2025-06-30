"use client";
import { Form } from "@/src/components/UI/Form";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { useState } from "react";
import { Search } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";

type ClientInfoProps = {
  clientes: ClienteBase[];
};

export default function SelectClient({ clientes }: ClientInfoProps) {
  const [filteredClientes, setFilteredClientes] =
    useState<ClienteBase[]>(clientes);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentClient, setCurrentClient] = useState<ClienteBase | null>(null);
  const [searchList, setSearchList] = useState<boolean>(false);

  function buscaCliente(value: string) {
    setSearchTerm(value);
    // setCurrentClient(null);
    if (!value) {
      setSearchList(false);
      setFilteredClientes(clientes);
      return;
    }
    const lower = value.toLowerCase();
    setFilteredClientes(
      clientes.filter(
        (c) =>
          c.nome.toLowerCase().includes(lower) ||
          c.cpf?.includes(lower) ||
          c.contato.includes(lower)
      )
    );
    setSearchList(true);
  }

  function carregaCliente(clientId: string) {
    const found = clientes.find((c) => c.id === clientId) || null;
    setCurrentClient(found);
    setSearchTerm(found ? found.nome : "");
    setSearchList(false);
  }

  return (
    <div className="lg:w-200 flex flex-col gap-4">
      <h3 className="mb-2 text-2xl font-semibold text-center text-black/80">
        Informe o Cliente
      </h3>

      <div className="relative">
        <Form.InputText
          id="busca-cliente"
          label="Buscar Cliente"
          type="text"
          placeholder="Nº contato, Nome ou CPF"
          icon={Search}
          className="span-full"
          value={searchTerm}
          onChange={(e) => buscaCliente(e.target.value)}
        />

        {searchList && (
          <div className="absolute top-full mt-1 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-md z-30">
            <ul>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((c) => (
                  <li
                    key={c.id}
                    className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                    onClick={() => carregaCliente(c.id)}
                  >
                    <span
                      className="w-30 truncate font-semibold"
                      title={c.nome}
                    >
                      {c.nome}
                    </span>
                    <span className="w-25 text-sm text-text-secondary">
                      {c.contato}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-text-secondary">
                  Nenhum cliente encontrado
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Detalhes do cliente selecionado */}
      {currentClient && (
        <div
          id="client-details"
          className="mt-4 p-4 bg-slate-50 rounded-lg shadow-md transition-opacity duration-500 ease-in-out"
        >
          <h4 className="mb-2 text-lg font-medium text-black/80">
            Detalhes do Cliente
          </h4>
          <p>
            <strong>Nome:</strong> {currentClient.nome}
          </p>
          <p>
            <strong>Contato:</strong> {currentClient.contato}
          </p>
          {currentClient.cpf && (
            <p>
              <strong>Endereço:</strong>{" "}
              {currentClient.cidade +
                ", " +
                currentClient.bairro +
                ", " +
                currentClient.estado +
                ", " +
                currentClient.numero}
            </p>
          )}
          <p>
            <strong>Cep:</strong> {currentClient.cep}
          </p>
          {/* Renderize aqui outros campos de currentClient conforme necessário */}
        </div>
      )}

      <PrimaryButton text="Próximo" className="self-end" />
    </div>
  );
}
