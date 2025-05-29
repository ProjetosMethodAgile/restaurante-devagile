import Counter from "@/src/components/UI/Counter";
import { ListOrdered, Pen, Trash, Trash2 } from "lucide-react";
import OrderCard from "../../Orders/Grid/OrderCard";

export default function ItemOrder() {
  return (
    <div className="bg-gray-100 w-full p-4 rounded-xl items-center justify-center  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Seção esquerda: Ações e descrição */}
      <div className="flex items-start gap-4 flex-1">
        {/* Ícones */}
        <div className="flex items-center gap-2 justify-center">
          <Trash2
            className="text-red-500 hover:text-red-700 self-center cursor-pointer"
            size={18}
          />
        </div>

        {/* Descrição do pedido */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-gray-800 text-base">
            Frango à Parmegiana - Média
          </h4>
          <p className="text-sm text-gray-500">
            Arroz, Feijão, Salada, Frango à Parmegiana
          </p>
          <p className="text-sm text-gray-400">Obs: Sem Feijão</p>
        </div>
      </div>

      {/* Seção direita: Contador e preço */}
      <div className="flex items-center gap-4">
        <Counter />
        <p className="text-green-600 font-semibold text-md whitespace-nowrap">
          R$ 25,00
        </p>
      </div>
    </div>
  );
}
