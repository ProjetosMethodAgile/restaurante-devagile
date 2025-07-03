import SecondaryButton from "@/src/components/UI/SecondaryButton";
import SecondaryTitle from "@/src/components/UI/SecondaryTitle";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import ItensAddModal from "./ItensAddModal";

type ItensToOrderProps = {
  produtos: ProdutoBase[] | null;
};

export default function ItensToOrder({ produtos }: ItensToOrderProps) {
  if (!produtos) return;

  const [produtosToOrder, setProdutosToOrder] = useState<ProdutoBase[]>();

  return (
    <section className="col-span-2">
      <div className="flex items-center justify-between"></div>
      {/* <ItensAddModal produtos={produtos} />  */}
      <div className="mt-6">
        <ul className=" flex gap-4 flex-col">
          {produtosToOrder?.map((produto, index) => {
            return (
              <li
                key={index}
                className="text-sm grid rounded-xl grid-cols-2 justify-center border-[1px] border-slate-100 px-4 py-4"
              >
                <div className="flex flex-col">
                  <p className="font-medium">{produto.nome}</p>
                  <span className="text-slate-500 text-xs">
                    Codigo: {produto.codigo}
                  </span>
                  <span className="text-slate-500 text-xs">
                    Variaçao: {produto.variacoes[0].nome}
                  </span>
                </div>
                <div className="flex gap-2 items-center justify-end">
                  <Plus className="bg-secondary size-5 rounded-full text-white p-1" />
                  <span>1</span>
                  <Plus className="bg-secondary size-5 rounded-full text-white p-1" />
                </div>
                <div className="col-span-full border-t-[1px] mt-4 pt-2 border-slate-100 flex items-center justify-between">
                  <p className="text-primary text-xs ">Remover</p>
                  <span>Total: R$ 109,90</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
