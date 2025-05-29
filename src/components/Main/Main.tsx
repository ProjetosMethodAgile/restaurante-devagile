"use client";

import GenericInput from "@/src/components/UI/GenericInput";
import GenericSelectInput from "@/src/components/UI/GenericSelectInput";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { LayoutGrid, LayoutList, List, Plus } from "lucide-react";
import OrdersSummary from "./OrderResume/OdersSummary";
import OrdersList from "./Orders/List/OrdersList";
import OrdersGrid from "./Orders/Grid/OrdersGrid";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Main() {
  const [isGrid, setIsGrid] = useState(true);
  const router = useRouter();

  const handleNovoPedido = () => {
    router.push("/protect/pedido");
  };

  return (
    <main className="container-global w-full">
      <header className="flex items-center justify-between ">
        <div>
          <PrimaryTitle title="Controle de Pedidos" />
        </div>
        <div className="flex items-center justify-end gap-6">
          <GenericInput />
          <GenericSelectInput />
          <PrimaryButton
            onClick={handleNovoPedido}
            icon={Plus}
            text="Novo Pedido"
          />
        </div>
      </header>
      <section className="bg-white mt-10 shadow-md rounded-xl p-8">
        <OrdersSummary />
      </section>
      <section className="my-4">
        <div className="flex items-center gap-4 justify-end *:active:translate-none *:hover:shadow-lg *:hover:-translate-y-0.5 *:transition-all  ">
          <LayoutGrid
            onClick={() => setIsGrid(true)}
            className=" mb-4 cursor-pointer shadow-md bg-white p-1 size-10 rounded-md"
          />
          <List
            onClick={() => setIsGrid(false)}
            className=" mb-4 cursor-pointer shadow-md bg-white p-1 size-10 rounded-md"
          />
        </div>
        {isGrid ? <OrdersGrid /> : <OrdersList />}
      </section>
    </main>
  );
}
