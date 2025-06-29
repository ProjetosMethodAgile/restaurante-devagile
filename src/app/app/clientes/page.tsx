import getClientes from "@/src/actions/clientes/getClientes";
import getUserId from "@/src/actions/user/getUserId";
import ClientesContainer from "@/src/components/Clientes/ClientesContainer";
import { EmpresaBase } from "@/src/types/empresa/empresaType";

export default async function ClientePage() {
  const { data } = await getClientes();
  const { data: user } = await getUserId();

  const empresasVinculadasAoUsuario: EmpresaBase[] =
    user?.empresas?.map((e) => e.empresa) ?? [];

  return (
    <div className="relative">
      <ClientesContainer
        clientes={data}
        empresas={empresasVinculadasAoUsuario}
      />
    </div>
  );
}
