import { postUser } from "@/src/actions/usuarios-actions/postUser";
import { Form } from "@/src/components/Form";
import PrimaryButton from "@/src/utils/UI/PrimaryButton";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import SecondaryTitle from "@/src/utils/UI/SecondaryTitle";
import { Check } from "lucide-react";
import { useActionState } from "react";

export default async function UsuarioFormPage() {
  return (
    <section className=" m-4 *:border-b-[2px] *:pb-6 *:border-slate-100 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
    </section>
  );
}
