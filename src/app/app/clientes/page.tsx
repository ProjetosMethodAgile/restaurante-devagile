import getClientes from "@/src/actions/clientes/getClientes";
import getUserId from "@/src/actions/user/getUserId";
import ClientesContainer from "@/src/components/Clientes/ClientesContainer";
import { EmpresaBase } from "@/src/types/empresa/empresaType";
import { cookies } from "next/headers";

export default async function ClientePage() {
  const { data } = await getClientes();
  const { data: user } = await getUserId();

  const empresasVinculadasAoUsuario: EmpresaBase[] =
    user?.empresas?.map((e) => e.empresa) ?? [];
  const cookieStore = cookies();
  const empresaCookie = (await cookieStore).get("empresaStorage")?.value;

  const filterEmpresaNaoLogada = empresasVinculadasAoUsuario.filter(
    (empresa) => empresa.id !== empresaCookie
  );


  
  return (
    <div className="relative">
      <ClientesContainer clientes={data} empresas={filterEmpresaNaoLogada} />
    </div>
  );
}
