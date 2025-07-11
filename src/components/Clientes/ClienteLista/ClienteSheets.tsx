import { ClienteBase } from "@/src/types/cliente/clientType";
import { BookCheck, Clipboard, Pencil, Settings, User } from "lucide-react";
type ClienteSheetsProps ={
  paginated:ClienteBase[]
  handleActiveEdit:(cliente: ClienteBase) => void;
  copiadoId:string|null;
  handleCopy:(contato: string,id:string) => void;
}
export default function ClienteSheets({paginated,handleActiveEdit,copiadoId,handleCopy}:ClienteSheetsProps){
    return(
         <table className="min-w-full table-auto text-sm text-left whitespace-nowrap ">
            <thead className="bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider "> 
               <tr>
                <th className="px-4 py-3"><Settings /></th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Frete</th>
                <th className="px-4 py-3">Endereço</th>
                <th className="px-4 py-3">Observação</th>
                <th className="px-4 py-3">Empresa cadastrada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated && paginated.length > 0 ? (
                paginated.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer hover:scale-101s "
                  >
                      <td className="px-4 py-3">
                      <div
                        className=" items-center flex justify-center bg-secondary size-10 rounded-[15px] cursor-pointer "
                        onClick={() => {
                          handleActiveEdit(cliente);
                        }}
                      >
                        <Pencil className="size-5 text-white" />
                      </div>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
                      <User
                        className="w-4 h-4 text-blue-600"
                        onClick={() => {
                          handleActiveEdit(cliente);
                        }}
                      />
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
                    <td
                      className="px-4 py-3"
                      onClick={() => {
                        handleActiveEdit(cliente);
                      }}
                    >
                      {cliente.frete}
                    </td>
                    <td
                      className="px-4 py-3 text-gray-500 max-w-xs truncate"
                      onClick={() => {
                        handleActiveEdit(cliente);
                      }}
                    >
                      <div className="flex flex-col">
                        <p>{cliente.cep}</p>
                        <p>{cliente.rua}</p>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={() => {
                        handleActiveEdit(cliente);
                      }}
                    >
                      {cliente.observacao}
                    </td>
                    <td className="px-4 py-3">
                      <ul className="list-disc list-inside overflow-y-auto flex justify-center flex-col"  onClick={()=>{handleActiveEdit(cliente)}}>
                        {cliente.empresas.map((e) => (
                          <li key={e.empresa.id}>
                            {e.empresa.razao_social.length > 22
                              ? e.empresa.razao_social.slice(0, 22) + "..."
                              : e.empresa.razao_social}
                          </li>
                        ))}
                      </ul>
                    </td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Nenhum cliente cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
    )
}