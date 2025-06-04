import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import UsuariosLista from "@/src/components/Usuarios/UsuariosLista/UsuariosLista";

export default async function UsuariosPage() {
  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
      <PrimaryTitle title="Usuarios do sistema" />
      <UsuariosLista />
    </section>
  );
}
