"use client";
import { Form } from "@/src/components/UI/Form";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { useState } from "react";
import { PlusCircle, Search, X } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";
import ClienteForm from "../../Clientes/ClienteForm/ClienteForm";
import { EmpresaBase } from "@/src/types/empresa/empresaType";

type ClientInfoProps = {
  clientes: ClienteBase[];
  userEmpresas: EmpresaBase[];
};

export default function SelectClient({
  clientes,
  userEmpresas,
}: ClientInfoProps) {
  const [filteredClientes, setFilteredClientes] =
    useState<ClienteBase[]>(clientes);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentClient, setCurrentClient] = useState<ClienteBase | null>(null);
  const [searchList, setSearchList] = useState<boolean>(false);
  const [openModalCliente, setOpenModalCliente] = useState(false);

  function buscaCliente(value: string) {
    setSearchTerm(value);
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
    <div className="lg:w-200 flex flex-col gap-4 relative">
      <h3 className=" text-2xl font-semibold text-center text-black/80">
        Informe o Cliente
      </h3>

      <div className="relative">
        {searchTerm && (
          <button
            title="apagar texto"
            onClick={() => {
              setCurrentClient(null);
              setSearchTerm("");
              setSearchList(false);
            }}
            className="text-primary absolute left-[-25] bottom-[7] cursor-pointer hover:text-700 hover:scale-110 transition-all duration-150"
          >
            <X />
          </button>
        )}
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
                      {c.nome.length > 12
                        ? c.nome.slice(0, 12) + "..."
                        : c.nome}
                    </span>
                    <span className="w-25 text-sm text-text-secondary ">
                      {c.contato}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-text-secondary hover:bg-gray-100 flex gap-2 flex-wrap items-center justify-between">
                  <p className="cursor-default"> Nenhum cliente encontrado</p>
                  <button
                    className="cursor-pointer flex gap-1 bg-primary text-white rounded-lg p-2 hover:bg-red-700 active:scale-95 transition-all duration-150"
                    onClick={() => {
                      setSearchList(false);
                      setOpenModalCliente(true);
                    }}
                  >
                    <PlusCircle className="" /> adicionar novo
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div
        id="client-details"
        className="mt-4 p-4 bg-slate-50 rounded-lg shadow-md transition-opacity duration-500 ease-in-out"
      >
        {currentClient ? (
          <>
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
          </>
        ) : (
          <button
            className="cursor-pointer flex gap-1 ring-1 ring-inset  text-primary rounded-lg p-2 hover:ring-2 active:scale-95 transition-all duration-150 justify-self-center"
            onClick={() => setOpenModalCliente(true)}
          >
            <PlusCircle className="" /> adicionar novo Cliente
          </button>
        )}
      </div>

      <PrimaryButton
        text="Próximo"
        className={`self-end ${
          !currentClient &&
          "bg-gray-400 cursor-not-allowed hover:bg-gray-400 active:scale-100"
        }`}
      />
      {openModalCliente && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto p-6">
            <ClienteForm
              setOpenModalCliente={setOpenModalCliente}
              empresas={userEmpresas}
            />
          </div>
        </div>
      )}
    </div>
  );
}
