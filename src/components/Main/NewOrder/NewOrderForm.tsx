"use client";

import { X } from "lucide-react";
import { useGlobalContext } from "@/src/context.ts/globalContext";
import ClientInfo from "./ClientInfos/ClientInfo";
import ItemsToOrder from "./ItemsToOrder/ItemsToOrder";
import ItemsSearch from "./ItemsSearch/ItemSearch";

export default function NewOrderForm() {
  const { closeGlobalModal } = useGlobalContext();
  return (
    <section className="bg-white shadow-md max-h-[95%] w-[95%]  overflow-y-auto rounded-xl p-8">
      <div className="flex justify-between ">
        <h2 className="font-bold mb-2 text-2xl text-secondary ">Novo Pedido</h2>
        <X className="cursor-pointer" onClick={closeGlobalModal} />
      </div>
      <div className="grid grid-cols-3 gap-10 py-4 ">
        {/*  <ClientInfo />
        <ItemsToOrder /> */}
      </div>
      <ItemsSearch />
    </section>
  );
}
