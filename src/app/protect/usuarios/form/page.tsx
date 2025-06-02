import getRoles from "@/src/actions/roles/getRoles";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

import UsuarioForm from "@/src/components/Usuarios/UsuarioForm/UsuariosForm";

export default async function UsuarioFormPage() {
  const { data: roles } = await getRoles();
  console.log(roles);
  if (!roles) return <div>Ocorreu um erro ao carregar os dados</div>;
  /*   const roles = getRoles(); */
  /*   console.log(roles);  */

  /*   if (!roles) return <div>Ocorreu um erro ao cadastrar</div>; */

  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <UsuarioForm roles={roles} />
    </section>
  );
}
