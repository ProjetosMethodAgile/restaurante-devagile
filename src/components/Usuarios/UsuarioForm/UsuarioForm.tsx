"use client";
import { Form } from "../../Form";
import { useActionState } from "react";
import { postUser } from "@/src/actions/usuarios-actions/postUser";
import UsuariosInfosForm from "./UsuariosInfosForm";
import UsuariosPemissoesForm from "./UsuariosPermissoesForm";

export default function UsuarioForm() {
  const [state, formAction] = useActionState(postUser, {
    errors: [],
    msg_success: "",
    success: false,
  });
  return (
    <Form.Root action={formAction} className="grid grid-cols-2 gap-4">
      <UsuariosInfosForm />
      <UsuariosPemissoesForm />
    </Form.Root>
  );
}
