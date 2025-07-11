import { BookCheck, Clipboard, Pencil, Settings, TriangleAlert, User } from "lucide-react";
import { isExpired } from "../MotoristaAcoes/contract/verificaValidade";
import { formatDateToView } from "@/src/utils/ConverteData";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import { SetStateAction } from "react";
type MotoristaSheetsProps ={
  paginated:MotoristaBase[]
  handleActiveEdit:(motorista: MotoristaBase) => void;
  copiadoId:string|null;
  handleCopy:(contato: string,id:string) => void;
  setModalEdit:React.Dispatch<SetStateAction<boolean>>
  setMotoristaEdit:React.Dispatch<SetStateAction<MotoristaBase|undefined>>
}
export default function MotoristaSheets({paginated,handleActiveEdit,copiadoId,handleCopy,setModalEdit,setMotoristaEdit}:MotoristaSheetsProps){
    return(
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
                      {motorista.validadecnh}
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
    )
}