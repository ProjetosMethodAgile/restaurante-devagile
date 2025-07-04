import getRoles from "@/src/actions/roles/getRoles";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

import UsuarioForm from "@/src/components/Usuarios/UsuarioForm/UsuariosForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function UsuarioFormPage() {
  const { data: roles } = await getRoles();

  if (!roles) return <div>Ocorreu um erro ao carregar os dados</div>;

  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4">
        <Link href="/app/usuarios">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>

        <PrimaryTitle title="Cadastro de usuario" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <UsuarioForm roles={roles} />
      </div>
    </section>
  );
}
