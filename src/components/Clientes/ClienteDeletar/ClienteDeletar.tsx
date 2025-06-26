"use client";

import { deletaClientePorID } from "@/src/actions/clientes/deletaClientePorID";
import { ClienteBase } from "@/src/types/cliente/clientType";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

type ClienteDeleteProps = {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  cliente: ClienteBase[]; 
};

export default function ClienteDeletar({
  setModalDelete,
  cliente,
}: ClienteDeleteProps) {
async function handleDeleteCliente(id:string){
    const response = await deletaClientePorID(id)
   if (response.errors) {
    toast.error(response.errors)
   }
 setModalDelete(false)
toast.success(response.msg_success)
}
  if (!cliente) return null;
  return (
    cliente.map((cliente)=>(

        <div className="w-full h-full absolute top-0 left-0 z-50 bg-slate-50 shadow shadow-md">
      <div className="flex items-center p-5">
        <div
          onClick={() => setModalDelete(false)}
          className="mr-4 text-blue-800 cursor-pointer duration-75"
          >
          <ArrowLeft size={24} />
        </div>
        <h1 className="text-2xl text-gray-800">Excluir cliente</h1>
      </div>
      <div className="p-5 gap-1 flex flex-col">
        <h3>Infoemações:</h3>
        <p className="font-medium text-gray-800">Nome: {cliente.nome}</p>
        <p className="font-medium text-gray-800">Contato: {cliente.contato}</p>
        <br />
        <h3>Endereço:</h3>
        <p className="text-sm text-gray-600">Email: {cliente.email}</p>
        <p className="text-sm text-gray-600">Cep: {cliente.cep}</p>
        <p className="text-sm text-gray-600">Local: {cliente.estado} | Cidade: {cliente.cidade} | Estado: {cliente.bairro} | {cliente.rua} | Numero: {cliente.numero}</p>
        <br />
        <h3>Obs:</h3>
        <p className="text-sm text-gray-600">Frete: {cliente.frete}</p>
        <p className="text-sm text-gray-600">Observa;'ao': {cliente.observacao}</p>
      
      </div>
      <div className="flex justify-center gap-2">
      <button className="w-40 bg-secondary p-2 rounded-[10px] text-amber-50" onClick={()=>handleDeleteCliente(cliente.id)} >Excluir</button>
      <button className="w-40  bg-gray-400 p-2 rounded-[10px] text-amber-50" onClick={()=>setModalDelete(false)} >Voltar</button>
      </div>
    </div>
        ))
  );
}
