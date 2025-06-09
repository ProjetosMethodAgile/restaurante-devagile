import getRoles from "@/src/actions/roles/getRoles";
import getUserId from "@/src/actions/user/getUserId";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

import UsuarioForm from "@/src/components/Usuarios/UsuarioForm/UsuariosForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type AtualizarUsuariosProps = {
  params: Promise<{ id: string; empresaTag: string }>;
};

export default async function UsuarioFormUpdatePage({
  params,
}: AtualizarUsuariosProps) {
  const { data: roles } = await getRoles();
  const { data } = await getUserId((await params).id);

  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4" >
        <Link href="/app/usuarios">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>

        <PrimaryTitle title="Cadastro de usuario" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <UsuarioForm isEditMode editData={data} roles={roles} />
      </div>
    </section>
  );
}
