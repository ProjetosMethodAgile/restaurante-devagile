"use client";
import { Form } from "@/src/components/UI/Form";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import SecondaryButton from "../UI/SecondaryButton";
import { FormClienteData } from "@/src/types/cliente/clientType";

export type ComponenteClientesState = FormClienteData & {
  status: boolean;
};

export interface ContainerClientesProps {
  clientes: FormClienteData[];
  dataAlteredUser: ComponenteClientesState[];
  setDataAlteredUser: React.Dispatch<
    React.SetStateAction<ComponenteClientesState[]>
  >;
}

export default function ContainerClientes({
  setDataAlteredUser,
  clientes,
}: ContainerClientesProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 5;

  // Atualiza apenas o input, sem filtrar ainda
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Dispara a busca ao clicar
  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchTerm(searchInput);
    setCurrentPage(0);
  };

  // Avança ou retrocede páginas
  const goToPage = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  // Filtra agora pelo termo confirmado
  const filteredClientes = clientes.filter((item) => {
    if (!searchTerm) return true;
    const onlyDigits = /^\d+$/.test(searchTerm);
    if (onlyDigits) {
      const phone = item.contato.replace(/\D/g, "");
      return phone.includes(searchTerm);
    }
    return item.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Paginação
  const totalPages = Math.ceil(filteredClientes.length / pageSize);
  const paginated = filteredClientes.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Quando a página de resultados atualiza, desliga o loading
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [paginated, isLoading]);

  function handleAlterUser(data: FormClienteData) {
    setDataAlteredUser([
      {
        nome: data.nome,
        logradouro: data.logradouro,
        numeroInt: data.numeroInt,
        bairro: data.bairro,
        CEP: data.CEP,
        contato: data.contato,
        frete: data.frete,
        observacao: data.observacao,
        cidade: data.cidade,
        Estado: data.Estado,
        complemento: data.complemento,
        email: data.email,
        cpf: data.cpf,
        status: true,
      },
    ]);
  }
  return (
    <section className="gap-3 flex flex-col">
      {/* Input + Botão de Busca */}
      <div className="flex items-center gap-2 mb-4">
        <Form.InputText
          type="text"
          placeholder="Buscar por nome ou telefone"
          id="search"
          value={searchInput}
          onChange={handleSearchInputChange}
          icon={Search}
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>
      <p className="text-text-primary">
        Clientes cadastrados: {filteredClientes.length}
      </p>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <ul>
            {paginated.map((item, idx) => (
              <li
                key={idx}
                className="bg-white rounded border border-gray-200 mb-4 overflow-auto"
              >
                <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.nome}
                    </span>
                    {item.contato && (
                      <span className="text-sm text-gray-600">
                        Contato: {item.contato}
                      </span>
                    )}
                  
                  </div>
                  <div className="space-x-2 flex">
                    <SecondaryButton
                      className=" bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      text="Editar"
                      onClick={() => handleAlterUser(item)}
                    />
                    <SecondaryButton
                      className=" bg-red-500 text-white rounded hover:bg-red-600 transition"
                      text={"Excluir"}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 space-y-1">
                  <p className="text-sm text-gray-700">
                    Endereço: {item.logradouro}, {item.numeroInt}{" "}
                    {item.complemento && `- ${item.complemento}`}, {item.bairro}
                  </p>
                  <p className="text-sm text-gray-700">
                    Cidade/Estado: {item.cidade}/{item.Estado}
                  </p>
                  <p className="text-sm text-gray-700">CEP: {item.CEP}</p>
                  <p className="text-sm text-gray-700">
                    Frete: R$ {item.frete}
                  </p>
                  {item.email && (
                    <p className="text-sm text-gray-700">Email: {item.email}</p>
                  )}
                  {item.cpf && (
                    <p className="text-sm text-gray-700">CPF: {item.cpf}</p>
                  )}
                  {item.observacao && (
                    <p className="text-sm text-gray-700">
                      Observação: {item.observacao}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Controles de página */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <SecondaryButton
              disabled={currentPage === 0}
              onClick={() => goToPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              text={"Anterior"}
            />

            {Array.from({ length: totalPages }).map((_, page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <SecondaryButton
              disabled={currentPage === totalPages - 1}
              onClick={() => goToPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              text="Próximo"
            />
          </div>
        </>
      )}
    </section>
  );
}
