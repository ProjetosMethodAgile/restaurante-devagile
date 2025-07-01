import getClientes from "@/src/actions/clientes/getClientes";
import getProdutos from "@/src/actions/produtos/getProdutos";
import getUserId from "@/src/actions/user/getUserId";
import PedidoWrapper from "@/src/components/Pedidos/PedidoWrapper";
import { StepProvider } from "@/src/components/Pedidos/StepPedido/StepContext";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function PedidoPage() {
  const clientes = (await getClientes()).data;
  const produtos = (await getProdutos()).data;
  const { data: user } = await getUserId();

  const userEmpresas: EmpresaBase[] =
    user?.empresas?.map((e) => e.empresa) ?? [];

  const referer = (await headers()).get("referer") ?? "/";
  return (
    <section className="">
      <div className="flex items-center gap-4 container-global m-4">
        <Link href={referer}>
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>
        <PrimaryTitle title="Novo Pedido" />
      </div>

      <StepProvider>
        <div className="bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md items-center lg:w-250 md:w-200 sm:w-100 m-auto">
          <PedidoWrapper clientes={clientes} userEmpresas={userEmpresas} />
          {/* <NewOrderForm clientes={clientes} produtos={produtos} /> */}
        </div>
      </StepProvider>
    </section>
  );
}
