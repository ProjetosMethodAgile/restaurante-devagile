"use client";
import { ClienteBase } from "@/src/types/cliente/clientType";
import {
  
  LayoutGrid,
  LayoutList,
  Plus,

} from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import SecondaryButton from "../../UI/SecondaryButton";
import GenericSearch from "../../UI/GenericSearch";
import Paginacao from "@/src/utils/Paginacao";
import ClienteCard from "./ClienteCard";
import ClienteSheets from "./ClienteSheets";
type ClienteListaProps = {
  clientes: ClienteBase[];
  setOpenModalCliente: React.Dispatch<SetStateAction<boolean>>;
  setModalEdit: React.Dispatch<SetStateAction<boolean>>;
  setClienteEdit: React.Dispatch<SetStateAction<ClienteBase | undefined>>;
};
export default function ClienteLista({
  clientes,
  setOpenModalCliente,
  setClienteEdit,
  setModalEdit,
}: ClienteListaProps) {
  const [searchInput, setSearchInput] = useState("");
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 6;

  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
  const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };
  function handleActiveEdit(cliente: ClienteBase) {
    setModalEdit(true);
    setClienteEdit(cliente);
  }
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
    <section className="w-full px-4 py-4 relative ">
      <GenericSearch
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchTerm={setSearchTerm}
        setIsLoading={setIsLoading}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex  w-full justify-start gap-2">
        <SecondaryButton
          className="bg-secondary text-white justify-self-end mb-5"
          text="Adicionar"
          icon={Plus}
          onClick={() => setOpenModalCliente(true)}
        />
        <button
          onClick={() =>
            setModoVisualizacao((prev) =>
              prev === "lista" ? "cards" : "lista"
            )
          }
          className="flex items-center
        gap-2 text-sm px-4 py-2 mb-5
        bg-primary cursor-pointer
        hover:bg-primary/90
        transition-all text-white rounded-lg  justify-self-end"
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
      </div>
      {modoVisualizacao === "lista" ? (
        <div className="overflow-x-hiden border border-slate-200 rounded-xl shadow-sm bg-white w-full overflow-x-auto  ">
       <ClienteSheets
             paginated={paginated}
         handleActiveEdit={handleActiveEdit}
         copiadoId={copiadoId}
         handleCopy={handleCopy}
       />
        </div>
      ) : (
    <ClienteCard handleActiveEdit={handleActiveEdit} paginated={paginated}/>
      )}
       <Paginacao 
         goToPage={goToPage}
         totalPages={totalPages}
         currentPage={currentPage}
       />
    </section>
  );
}
