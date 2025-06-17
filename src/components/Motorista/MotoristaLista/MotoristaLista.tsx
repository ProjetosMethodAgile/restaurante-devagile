"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { motoristas } from "../motorista";
import { Form } from "@/src/components/UI/Form";
import { Search } from "lucide-react";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { toast } from "react-toastify";
import { scrollToSection } from "@/src/utils/ScrollFocus";

export default function MotoristaLista() {
  const itemsPerPage = 3;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza o valor do input
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  

  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchTerm(searchInput.trim());
    setCurrentPage(0);
  };

  // Filtra motoristas por nome ou telefone
  const filteredMotoristas = motoristas.filter((item) => {
    if (!searchTerm) return true;
    const onlyDigits = /^\d+$/.test(searchTerm);
    if (onlyDigits) {
      const phone = (item.telefone ?? "").replace(/\D/g, "");
      return phone.includes(searchTerm);
    }
    return item.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredMotoristas.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredMotoristas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Desliga o loading ao atualizar a lista
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [currentItems]);

  const goToPage = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col h-full">
      {/* Barra de busca */}
      <div className="flex flex-col md:flex-row items-center gap-2 p-4 bg-white sticky top-0 z-10">
        <Form.InputText
          type="text"
          placeholder="Buscar por nome ou telefone"
          id="search"
          value={searchInput}
          onChange={handleSearchInputChange}
          icon={Search}
          className="w-full md:flex-1"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>

      {/* Quantidade encontrada */}
      <p className="px-4 py-2 text-text-primary">
        Motoristas encontrados: {filteredMotoristas.length}
      </p>

      {/* Lista ou loading */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ul className="space-y-3">
            {currentItems.map((item, idx) => (
              <li
                key={startIndex + idx}
                className="bg-white rounded border border-gray-200 overflow-hidden"
              >
                <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
                  <div>
                    <span className="font-medium text-gray-800">
                      {item.nomeCompleto}
                    </span>
                    {item.telefone && (
                      <span className="block text-sm text-gray-600">
                        Contato: {item.telefone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 space-y-1">
                  {item.email && (
                    <p className="text-sm text-gray-700">Email: {item.email}</p>
                  )}
                  {item.cpf && (
                    <p className="text-sm text-gray-700">CPF: {item.cpf}</p>
                  )}
                  {item.rg && (
                    <p className="text-sm text-gray-700">RG: {item.rg}</p>
                  )}
                  {item.dataNascimento && (
                    <p className="text-sm text-gray-700">
                      Nascimento: {item.dataNascimento}
                    </p>
                  )}
                  {item.numeroCNH && (
                    <p className="text-sm text-gray-700">
                      CNH: {item.numeroCNH} (Cat. {item.categoriaCNH})
                    </p>
                  )}
                  <p className="text-sm text-gray-700">
                    Endereço: {item.endereco.logradouro}, {item.endereco.numero}
                    {item.endereco.complemento && ` – ${item.endereco.complemento}`},{" "}
                    {item.endereco.bairro}
                  </p>
                  <p className="text-sm text-gray-700">
                    Cidade/Estado: {item.endereco.cidade}/{item.endereco.estado}
                  </p>
                  <p className="text-sm text-gray-700">CEP: {item.endereco.cep}</p>
                </div>

                       <div className="flex space-x-2">
                                      <SecondaryButton
                                        className="bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        text="Editar"
                                        onClick={(e: MouseEvent<HTMLElement>) => {
                                          handleAlterUser(item.id),
                                            scrollToSection(e, "formulario");
                                        }}
                                      />
                                      <SecondaryButton
                                        className="bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        text="Excluir"
                                        onClick={(e: MouseEvent<HTMLElement>) => {
                                          setDeleteTarget(item);
                                          scrollToSection(e, "formulario");
                                        }}
                                      />
                                    </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <SecondaryButton
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          text="‹ Anterior"
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
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          text="Próxima ›"
        />
      </div>
    </section>
  );
}