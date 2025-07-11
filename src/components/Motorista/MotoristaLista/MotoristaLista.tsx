import { SetStateAction, useEffect, useState } from "react";
import GenericSearch from "../../UI/GenericSearch";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import {
  LayoutGrid,
  LayoutList,
  Plus,

} from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import MotoristaCard from "./MotoristaCard";
import Paginacao from "@/src/utils/Paginacao";
import MotoristaSheets from "./MotoristaSheets";
type MotoristaProps = {
  motoristas: MotoristaBase[];
  setOpenModalMotorista: React.Dispatch<SetStateAction<boolean>>;
  setModalEdit: React.Dispatch<SetStateAction<boolean>>;
  setMotoristaEdit: React.Dispatch<SetStateAction<MotoristaBase | undefined>>;
};
export default function MotoristaLista({
  motoristas,
  setOpenModalMotorista,
  setModalEdit,
  setMotoristaEdit,
}: MotoristaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 6;
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
 
  const filteredmotoristas = motoristas

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

  const totalPages = Math.ceil(filteredmotoristas.length / pageSize);
  const paginated = filteredmotoristas.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  
  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [paginated, isLoading]);
  console.log(paginated);

  function handleActiveEdit(motorista: MotoristaBase) {
    setModalEdit(true);
    setMotoristaEdit(motorista);
  }

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
          onClick={() => setOpenModalMotorista(true)}
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
        <div className="overflow-x-hiden border border-slate-200 rounded-xl shadow-sm bg-white w-full overflow-x-auto ">
         <MotoristaSheets 
         paginated={paginated}
         handleActiveEdit={handleActiveEdit}
         copiadoId={copiadoId}
         handleCopy={handleCopy}
         setModalEdit={setModalEdit}
         setMotoristaEdit={setMotoristaEdit}
         
         />
        </div>
      ) : (
    <MotoristaCard handleActiveEdit={handleActiveEdit} paginated={paginated}/>
      )}
  <Paginacao 
    goToPage={goToPage}
    totalPages={totalPages}
    currentPage={currentPage}
  />
    </section>
  );
}
