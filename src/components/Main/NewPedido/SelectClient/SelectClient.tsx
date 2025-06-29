"use client";
import { Form } from "@/src/components/UI/Form";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";

type ClientInfoProps = {
  clientes: ClienteBase[] | [];
};

export default function SelectClient({ clientes }: ClientInfoProps) {
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
    <div className="lg:w-200">
      <h3 className="mb-2 text-2xl border-primary-300/20 text-black/80 font-semibold text-center">
        Informe o Cliente
      </h3>
      <Form.InputText
        id="busca-cliente"
        label="Buscar Cliente"
        type="text"
        placeholder="Nome ou CPF"
        icon={Search}
        className="span-full"
        onChange={(e) => buscaCliente(e.target.value)}
      />
      {searchList && (
        <div className="mt-2 max-h-60 overflow-y-auto z-30 shadow w-100 border absolute bg-white border-gray-300 rounded-lg">
          <ul>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <li
                  key={cliente.id}
                  className="cursor-pointer gap-4 flex hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                  onClick={() => carregaCliente(cliente.id)}
                >
                  <span className="font-semibold">{cliente.nome}</span>
                  <span className="text-sm text-text-secondary">
                    {cliente.cpf}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-text-secondary">Nenhum cliente encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
