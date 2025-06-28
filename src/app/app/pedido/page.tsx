import getClientes from "@/src/actions/clientes/getClientes";
import getProdutos from "@/src/actions/produtos/getProdutos";
import NewOrderForm from "@/src/components/Main/NewOrder/NewOrderForm";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PedidoPage() {
  const clientes = (await getClientes()).data;
  const produtos = (await getProdutos()).data;

  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4">
        <Link href="/app/produtos">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>
        <PrimaryTitle title="Novo Pedido" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <NewOrderForm clientes={clientes} produtos={produtos} />
      </div>
    </section>
  );
}
