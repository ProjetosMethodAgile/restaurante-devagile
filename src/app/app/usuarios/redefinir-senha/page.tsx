import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import RedefinirSenhaForm from "@/src/components/Usuarios/UsuarioRedefinirSenha/RedefinirSenhaForm";

export default async function RedefinirSenhaPage() {
  return (
    <section className="container-global mt-4 m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
      <PrimaryTitle title="Redefinir Senha" />
      <RedefinirSenhaForm />
    </section>
  );
}
