import SecondaryTitle from "@/src/utils/UI/SecondaryTitle";
import { Form } from "../..";
import { useActionState } from "react";
import { postUser } from "@/src/actions/usuarios-actions/postUser";
import UsuariosInfosForm from "./UsuariosInfosForm";

export default function UsuarioForm() {
  const [state, formAction] = useActionState(postUser, {
    errors: [],
    msg_success: "",
    success: false,
  });
  return (
    <Form.Root action={formAction} className="grid grid-cols-2 gap-4">
      <UsuariosInfosForm />
      <UsuariosInfosForm />
      <Form.ButtonChange className="bg-secondary">Cadastrar</Form.ButtonChange>
    </Form.Root>
  );
}
