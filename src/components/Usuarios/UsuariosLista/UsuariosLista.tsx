import { Plus } from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import UsuarioCard from "./UsuarioCard";
import UsuariosFiltro from "./UsuariosFiltro";

export default function UsuariosLista() {
  return (
    <section>
      <div className="flex items-center gap-6">
        <UsuariosFiltro />{" "}
        <SecondaryButton
          className="bg-secondary text-white"
          text="Adicionar"
          icon={Plus}
        />
      </div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        <UsuarioCard />
        <UsuarioCard />
        <UsuarioCard />
        <UsuarioCard />
        <UsuarioCard />
      </div>
    </section>
  );
}
