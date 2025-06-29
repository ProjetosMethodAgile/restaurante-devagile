import getClientes from "@/src/actions/clientes/getClientes";
import getProdutos from "@/src/actions/produtos/getProdutos";
import SelectClient from "@/src/components/Main/NewPedido/SelectClient/SelectClient";
import StepPedido from "@/src/components/Main/NewPedido/StepPedido/StepPedido";
import { Form } from "@/src/components/UI/Form";

import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PedidoPage() {
  const clientes = (await getClientes()).data;
  const produtos = (await getProdutos()).data;

  return (
    <section className="">
      <div className="flex items-center gap-4 container-global m-4">
        <Link href="/app/produtos">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>
        <PrimaryTitle title="Novo Pedido" />
      </div>
      <div className="bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md items-center lg:w-250 md:w-200 sm:w-100 m-auto">
        <StepPedido currentStep={0} />
        <SelectClient clientes={clientes} />
        {/* <NewOrderForm clientes={clientes} produtos={produtos} /> */}
      </div>
    </section>
  );
}
