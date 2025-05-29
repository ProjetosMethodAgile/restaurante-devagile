import SecondaryTitle from "@/src/components/UI/SecondaryTitle";
import { Form } from "../..";
import { useActionState } from "react";
import { postUser } from "@/src/actions/usuarios-actions/postUser";

export default function UsuariosInfosForm() {
  return (
    <div>
      <SecondaryTitle title="Dados do usuario" />
      <Form.InputText label="Nome" type="text" placeholder="João da silva" />
      <Form.InputText
        label="Email"
        type="email"
        placeholder="usuario@email.com.br"
      />
      <Form.InputOptions label="Empresa" type="text" />
    </div>
  );
}
