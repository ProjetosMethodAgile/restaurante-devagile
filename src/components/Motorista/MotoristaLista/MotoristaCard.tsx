import { motion } from "framer-motion";
import { isExpired } from "../MotoristaAcoes/contract/verificaValidade";
import { TriangleAlert, User } from "lucide-react";
import { formatDateToView } from "@/src/utils/ConverteData";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";

type MotoristaCardProps ={
  handleActiveEdit: (motorista: MotoristaBase) => void;
  paginated: MotoristaBase[];
}

export default function MotoristaCard({handleActiveEdit,paginated}:MotoristaCardProps){

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
         key="card"
        variants={motionProps.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
        </motion.div>
    )
}