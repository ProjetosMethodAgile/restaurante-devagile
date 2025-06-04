'use client'
import { Link, Plus } from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import UsuarioCard from "./UsuarioCard";
import UsuariosFiltro from "./UsuariosFiltro";
import { UsuarioBase } from "@/src/types/user/userType";
import { useRouter } from 'next/navigation'

type UsuariosListaProps = {
  usuarios: UsuarioBase[];
};

export default function UsuariosLista({ usuarios }: UsuariosListaProps) {
  const router = useRouter();
  return (
    <section>
      <div className="flex items-center gap-6">
        <UsuariosFiltro />{" "}
        <SecondaryButton
          className="bg-secondary text-white"
          text="Adicionar"
          icon={Plus}
          onClick={()=> router.push("/app/usuarios/form")}
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-6">
        {usuarios.map((usuario) => {
          return <UsuarioCard key={usuario.codigo} usuario={usuario} />;
        })}
      </div>
    </section>
  );
}
