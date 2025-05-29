import UsuarioForm from "@/src/components/Usuarios/UsuarioForm/UsuarioForm";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";

export default async function UsuarioFormPage() {
  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <UsuarioForm />
    </section>
  );
}
