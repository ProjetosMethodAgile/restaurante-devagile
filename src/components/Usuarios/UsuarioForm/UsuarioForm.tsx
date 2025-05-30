"use client";
import { Form } from "../../UI/Form";
import { useActionState, useEffect } from "react";

import UsuariosInfosForm from "./UsuariosInfosForm";
import UsuariosPemissoesForm from "./UsuariosPermissoesForm";
import PrimaryButton from "../../UI/PrimaryButton";
import { Check } from "lucide-react";


export default function UsuarioForm() {
  /* const [state, formAction] = useActionState(postUser, {
    errors: [],
    msg_success: "",
    success: false,
  }); */
  return (
    <Form.Root
      /*  action={formAction} */
      className="flex flex-col gap-4 *:border-b-1 *:border-slate-200 *:pb-6"
    >
      <UsuariosInfosForm />
      <UsuariosPemissoesForm />
      <PrimaryButton
        text="Cadastrar "
        className="bg-secondary self-end rounded-xl hover:bg-secondary/90"
        icon={Check}
        type="submit"
      />
    </Form.Root>
  );
}
