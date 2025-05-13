import GenericInput from "@/src/utils/UI/GenericInput";
import GenericSelectInput from "@/src/utils/UI/GenericSelectInput";
import PrimaryButton from "@/src/utils/UI/PrimaryButton";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import { Plus } from "lucide-react";
import OrdersSummary from "./OrderResume/OdersSummary";
import OrdersGrid from "./OrderList/OrdersGrid";

export default function Main() {
  return (
    <main className="container-global w-full">
      <header className="flex items-center justify-between ">
        <div>
          <PrimaryTitle title="Controle de Pedidos" />
        </div>
        <div className="flex items-center justify-end gap-6">
          <GenericInput />
          <GenericSelectInput />
          <PrimaryButton icon={Plus} text="Novo Pedido" />
        </div>
      </header>
      <section className="bg-white mt-10 shadow-md rounded-xl p-8">
        <OrdersSummary />
      </section>
      <section className="mt-6">
        <OrdersGrid />
      </section>
    </main>
  );
}
