"use server";
import getUsersByEmpId from "@/src/actions/user/getUsersByEmpId";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import UsuariosLista from "@/src/components/Usuarios/UsuariosLista/UsuariosLista";

export default async function UsuariosPage() {
  const usuariosApi = await getUsersByEmpId();
  const usuarios = usuariosApi.data;

  if (!usuarios)
    return <p className="text-red-500">Não foi possivel obter os usuarios</p>;
  return (
    <section>
      <div className="container-global m-4">
        <PrimaryTitle title="Usuarios do sistema" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <UsuariosLista usuarios={usuarios} />
      </div>
    </section>
  );
}
