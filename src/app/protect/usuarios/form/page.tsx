import { postUser } from "@/src/actions/usuarios-actions/postUser";
import { Form } from "@/src/components/Form";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import SecondaryTitle from "@/src/components/UI/SecondaryTitle";
import { Check } from "lucide-react";
import { useActionState } from "react";


export default async function UsuarioFormPage() {
  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <UsuarioForm />
    </section>
  );
}
