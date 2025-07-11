"use client"
import { ClienteBase } from "@/src/types/cliente/clientType";
import { motion } from "framer-motion";
import { User } from "lucide-react";
type ClienteCardProps ={
  handleActiveEdit: (cliente: ClienteBase) => void;
  paginated: ClienteBase[];
}
export default function ClienteCard({handleActiveEdit,paginated}:ClienteCardProps){

       const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    }
  }
    return(
            // Modo em cards
        <motion.div 
                        key="cardClient"
               variants={motionProps.containerVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {paginated && paginated.length > 0 ? (
            paginated.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-white  rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:scale-101 cursor-pointer"
              >
                <div
                  onClick={() => {
                    handleActiveEdit(cliente);
                  }}
                  className="flex items-center p-3 gap-2 mb-2 font-semibold text-base bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider"
                >
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
                <div className="text-sm mb-1 text-gray-600 pl-4 ">
                  {cliente.rua}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Complemento: {cliente.complemento}
                </div>
                <div className="text-sm mb-1  text-gray-600 pl-4 ">
                  Frete: {cliente.frete}
                </div>
                <div className="text-sm text-gray-600 mb-2 pl-4"   onClick={()=>{handleActiveEdit(cliente)}}>
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
        </motion.div>
    )
}