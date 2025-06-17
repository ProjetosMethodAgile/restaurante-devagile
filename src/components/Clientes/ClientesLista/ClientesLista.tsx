// src/components/Clientes/ContainerClientes.tsx
"use client";
import { Form } from "@/src/components/UI/Form";
import { useState, useEffect,  MouseEvent } from "react";
import { Search } from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { deletaClientePorID } from "@/src/actions/clientes/deletaClientePorID";
import { toast } from "react-toastify";
import { scrollToSection } from "@/src/utils/ScrollFocus";

export type ComponenteClientesState = ClienteBase & {
  status: boolean;
  __editIdx?: number;
};

export type ContainerClientesProps = {
  clientes: ClienteBase[];
  setDataAlteredUser: React.Dispatch<React.SetStateAction<string>>;
  setEdita?: React.Dispatch<React.SetStateAction<boolean>>;
  edita?: boolean;
};

export default function ClientesLista({
  setDataAlteredUser,
  setEdita,
  clientes,
}: ContainerClientesProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ClienteBase | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 5;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchTerm(searchInput);
    setCurrentPage(0);
  };
  const goToPage = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  const filteredClientes = clientes.filter((item) => {
    if (!searchTerm) return true;
    const onlyDigits = /^\d+$/.test(searchTerm);
    if (onlyDigits) {
      const phone = (item.contato ?? "").replace(/\D/g, "");
      return phone.includes(searchTerm);
    }
    return item.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredClientes.length / pageSize);
  const paginated = filteredClientes.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [paginated, isLoading]);

  async function handleAlterUser(id: string) {
    setEdita?.(true);
    if (id) {
      setDataAlteredUser(id);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletaClientePorID(deleteTarget.id);
      toast.success(`Cliente ${deleteTarget.nome} deletado com sucesso`);
      setDeleteTarget(null);
    } catch (error) {
      toast.error("Falha ao deletar cliente. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="flex flex-col h-full">
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
          className="px-4 py-2 bg-secondary text-white rounded-lg  hover:bg-secondary/90 transition"
        >
          Buscar
        </button>
      </div>

      <p className="px-4 py-2 text-text-primary">
        Clientes cadastrados: {filteredClientes.length}
      </p>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {paginated.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-white rounded border border-gray-200 overflow-hidden"
                >
                  <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
                    <div>
                      <span className="font-medium text-gray-800">
                        {item.nome}
                      </span>
                      {item.contato && (
                        <span className="block text-sm text-gray-600">
                          Contato: {item.contato}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <SecondaryButton
                        className="bg-secondary text-white  hover:bg-secondary/90 transition"
                        text="Editar"
                        onClick={(e: MouseEvent<HTMLElement>) => {
                          handleAlterUser(item.id),
                            scrollToSection(e, "formulario");
                        }}
                      />
                      <SecondaryButton
                        className="bg-primary text-white  hover:bg-primary/90 transition"
                        text="Excluir"
                        onClick={(e: MouseEvent<HTMLElement>) => {
                          setDeleteTarget(item);
                          scrollToSection(e, "formulario");
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-3 space-y-1">
                    <p className="text-sm text-gray-700">
                      Endereço: {item.rua}, {item.numero}{" "}
                      {item.complemento && `- ${item.complemento}`},{" "}
                      {item.bairro}
                    </p>
                    <p className="text-sm text-gray-700">
                      Cidade/Estado: {item.cidade}/{item.estado}
                    </p>
                    <p className="text-sm text-gray-700">CEP: {item.cep}</p>
                    <p className="text-sm text-gray-700">
                      Frete: R$ {item.frete}
                    </p>
                    {item.email && (
                      <p className="text-sm text-gray-700">
                        Email: {item.email}
                      </p>
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

            <div className="flex justify-center items-center space-x-2 mt-4">
              <SecondaryButton
                disabled={currentPage === 0}
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                text="Anterior"
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
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-9999 ">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
            <p className="mb-6">
              Tem certeza que deseja excluir{" "}
              <strong>{deleteTarget.nome}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => confirmDelete()}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50 flex items-center"
              >
                {isDeleting && (
                  <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                )}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
