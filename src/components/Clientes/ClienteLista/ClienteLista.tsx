"use client";
import { ClienteBase } from "@/src/types/cliente/clientType";
import {
  BookCheck,
  Clipboard,
  LayoutGrid,
  LayoutList,
  Package2,
  Plus,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import ClienteFiltro from "./ClienteFiltro";
import SecondaryButton from "../../UI/SecondaryButton";
type ClienteListaProps = {
  clientes: ClienteBase[];
};
export default function ClienteLista({ clientes }: ClienteListaProps) {
  const [searchInput, setSearchInput] = useState("");
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
  const filteredClientes = clientes

    .filter((item) => !item.deletado)

    .filter((item) => {
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
  async function handleCopy(contato: string, id: string) {
    try {
      await navigator.clipboard.writeText(contato);
      setCopiadoId(id);
      setTimeout(() => setCopiadoId(null), 1500);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  }
  const goToPage = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [paginated, isLoading]);

  return (
    <section className="w-full px-4 py-4">
          <SecondaryButton
                className="bg-secondary text-white justify-self-end mb-5"
                text="Adicionar"
                icon={Plus}
               
              />
      <ClienteFiltro
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchTerm={setSearchTerm}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
      />
      <button
        onClick={() =>
          setModoVisualizacao((prev) => (prev === "lista" ? "cards" : "lista"))
        }
        className="flex items-center gap-2 text-sm px-4 py-2 mb-5 bg-primary cursor-pointer hover:bg-primary/90 transition-all text-white rounded-lg  justify-self-end"
      >
        {modoVisualizacao === "lista" ? (
          <>
            <LayoutGrid size={16} />
            Visualizar em cards
          </>
        ) : (
          <>
            <LayoutList size={16} />
            Visualizar em lista
          </>
        )}
      </button>
    

      {modoVisualizacao === "lista" ? (
        <div className="overflow-x-hiden border border-slate-200 rounded-xl shadow-sm bg-white ">
          <table className="min-w-full text-sm text-left ">
            <thead className="bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Frete</th>
                <th className="px-4 py-3">Endereço</th>
                <th className="px-4 py-3">Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated && paginated.length > 0 ? (
                paginated.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer hover:scale-101 "
                  >
                    <td className="px-4 py-3 flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
                      <User className="w-4 h-4 text-blue-600" />
                      {cliente.nome}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {copiadoId === cliente.id ? (
                          <div className="relative">
                            <BookCheck className="w-4 h-4 text-green-500" />
                            <p className="absolute -left-10 text-[10px]">
                              Copiado
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Clipboard
                              className="w-4 h-4 text-blue-600 cursor-pointer hover:opacity-75"
                              onClick={() =>
                                handleCopy(cliente.contato, cliente.id)
                              }
                            />
                          </div>
                        )}
                        {cliente.contato}
                      </div>
                    </td>
                    <td className="px-4 py-3">{cliente.frete}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                      <div className="flex flex-col">
                        <p>{cliente.cep}</p>
                        <p>{cliente.rua}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{cliente.observacao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Nenhum produto cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Modo em cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {paginated && paginated.length > 0 ? (
            paginated.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-white  rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:scale-101 cursor-pointer"
              >
                <div className="flex items-center p-3 gap-2 mb-2 font-semibold text-base bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider">
                  <User className="text-blue-600 w-5 h-5" />
                  {cliente.nome}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  {cliente.contato}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Cep: {cliente.cep}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Bairro: {cliente.bairro}
                </div>
                <div className="text-sm mb-1 text-gray-600 pl-4 ">{cliente.rua}</div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Complemento: {cliente.complemento}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Frete: {cliente.frete}
                </div>
                <div className="text-sm text-gray-600 mb-2 pl-4">
                  Observação: {cliente.observacao}
                </div>

                <div className="flex flex-col gap-1 mt-2"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Nenhum cliente cadastrado
            </div>
          )}
        </div>
      )}
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
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
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
    </section>
  );
}
