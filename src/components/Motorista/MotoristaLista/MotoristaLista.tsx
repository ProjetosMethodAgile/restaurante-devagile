import { SetStateAction, useEffect, useState } from "react";
import GenericSearch from "../../UI/GenericSearch";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import {
  BookCheck,
  Clipboard,
  LayoutGrid,
  LayoutList,
  Pencil,
  Plus,
  Settings,
  TriangleAlert,
  User,
} from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import { isExpired } from "../MotoristaAcoes/contract/verificaValidade";
import { formatDateToView } from "@/src/utils/ConverteData";
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

  const pageSize = 5;
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
  console.log(paginated);

  function handleActiveEdit(motorista: MotoristaBase) {
    setModalEdit(true);
    setMotoristaEdit(motorista);
  }
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
        <div className="overflow-x-hiden border border-slate-200 rounded-xl shadow-sm bg-white   ">
          <table className="min-w-full text-sm text-left ">
            <thead className="bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider  ">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-5">Contato</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">CNH</th>
                <th className="px-4 py-3">Validade CNH</th>
                <th className="px-4 py-3">Endereço</th>
                <th className="px-4 py-3">Observação</th>
                <th className="px-4 py-3">Data de Nascimento</th>
                <th className="px-4 py-3">
                  <Settings />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated && paginated.length > 0 ? (
                paginated.map((motorista) => (
                  <tr
                    key={motorista.id}
                    className={`${
                      isExpired(motorista.validadecnh)
                        ? "bg-red-50 text-red-900 "
                        : ""
                    }hover:bg-slate-50 transition-colors cursor-pointer hover:scale-101s`}
                  >
                    <td
                      className="px-4 py-3 flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap relative"
                      onClick={() => handleActiveEdit(motorista)}
                    >
                      <>
                        {isExpired(motorista.validadecnh) ? (
                          <TriangleAlert className=" animate-pulse text-red-900 " />
                        ) : (
                         
                        <User className="w-4 h-4 text-blue-600" />
                        )}

                      </>
                        {motorista.nome.length> 20?motorista.nome.slice(0,20)+"...":motorista.nome}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-nowrap whitespace-nowrap gap-2">
                        {copiadoId === motorista.id ? (
                          <div className="relative">
                            <BookCheck className="w-4 h-4 text-green-500" />
                            <p className="absolute -left-10 text-[10px]">
                              Copiado
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Clipboard
                              className="w-4 h-4  text-blue-600 cursor-pointer hover:opacity-75"
                              onClick={() =>
                                handleCopy(motorista.contato, motorista.id)
                              }
                            />
                          </div>
                        )}
                        <p className="text-[12px]">{motorista.contato}</p>
                      </div>
                    </td>

                    <td
                      className="px-4 py-3"
                      onClick={() => handleActiveEdit(motorista)}
                    >
                      {motorista.email.length > 20
                        ? motorista.email.slice(0, 20)+"..."
                        : motorista.email}
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                      <div className="flex flex-col">
                        <p className="flex flex-col ">
                          <strong>Numero CNH</strong>
                          {motorista.numeroCnh}
                        </p>
                      </div>
                    </td>
                    <td
                      className={`relative  px-4 py-3`}
                      onClick={() => handleActiveEdit(motorista)}
                    >
                      {formatDateToView(motorista.validadecnh)}
                      <br></br>
                      {isExpired(motorista.validadecnh) ? <p>Renovação</p> : ""}
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={() => handleActiveEdit(motorista)}
                    >
                      {motorista.logradouro}
                    </td>
                    <td className="px-4 py-3 ">
                      <div className="w-35">
                        {motorista.observacao.length > 50
                          ? motorista.observacao.slice(0, 20)+"..."
                          : motorista.observacao}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={() => handleActiveEdit(motorista)}
                    >
                      {formatDateToView(motorista.dataNascimento)}
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className=" items-center flex justify-center bg-secondary size-10 rounded-[15px] cursor-pointer "
                        onClick={() => {
                          setModalEdit(true), setMotoristaEdit(motorista);
                        }}
                      >
                        <Pencil className="size-5 text-white" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Nenhum motorista cadastrado
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
            paginated.map((motorista) => (
              <div
                key={motorista.id}
                className={` rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:scale-101 cursor-pointer ${
                  isExpired(motorista.validadecnh) ? "bg-red-50 " : "bg-white "
                }`}
                onClick={() => handleActiveEdit(motorista)}
              >
                <div className={`flex items-center p-3 gap-2 mb-2 font-semibold text-base ${isExpired(motorista.validadecnh)?"bg-red-100":"bg-slate-50"}  border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider`}>
                 {isExpired(motorista.validadecnh)? <TriangleAlert className="animate-pulse text-red-900"/>:<User className="text-blue-600 w-5 h-5" />}
                  {motorista.nome}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4">
                  Contato: {motorista.contato}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4">
                  CNH: {motorista.numeroCnh}
                </div>
                <div className={`text-sm mb-1  text-gray-600 pl-4  ${isExpired(motorista.validadecnh)?"text-red-800":""}`}>
                  Validade: {formatDateToView(motorista.validadecnh)}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Cep: {motorista.cep}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Bairro: {motorista.bairro}
                </div>
                <div className="text-sm mb-1 text-gray-600 pl-4 ">
                  {motorista.rua}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Complemento: {motorista.complemento}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 "></div>
                <div className="text-sm text-gray-600 mb-2 pl-4">
                  Observação: {motorista.observacao}
                </div>

                <div className="flex flex-col gap-1 mt-2"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Nenhum motorista cadastrado
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
