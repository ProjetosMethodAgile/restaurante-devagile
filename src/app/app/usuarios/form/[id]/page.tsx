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
  console.log("data", data);

  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/app/usuarios">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>

        <PrimaryTitle title="Cadastro de usuario" />
      </div>
      <UsuarioForm isEditMode editData={data} roles={roles} />
    </section>
  );
}
