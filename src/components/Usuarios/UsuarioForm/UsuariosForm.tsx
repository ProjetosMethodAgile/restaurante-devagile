"use client";
import { Form } from "../../UI/Form";
import React, { useActionState } from "react";
/* import { postUser } from "@/src/actions/usuarios-actions/postUser"; */
import UsuariosInfosForm from "./UsuariosInfosForm";
import UsuariosPemissoesForm from "./UsuariosPermissoesForm";
import PrimaryButton from "../../UI/PrimaryButton";
import { Check } from "lucide-react";
import UsuarioEmpresasForm from "./UsuariosEmpresasForm";
import { useUser } from "@/src/context/userContext";
import { RoleBase } from "@/src/types/role/roleType";

type UsuarioFormProps = {
  roles: RoleBase[];
};

export type currentUserType = {
  nome: string;
  email: string;
  empresas: {
    label: string;
    add: boolean;
  }[];
  role: {
    label: string;
    value: string;
  };
};

export type currentUserProps = {
  currentUser: currentUserType;
  setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType>>;
};

export default function UsuarioForm({ roles }: UsuarioFormProps) {
  /*   const [state, formAction] = useActionState(postUser, {
    errors: [],
    msg_success: "",
    success: false,
  }); */
  const { user } = useUser();

  // Transformando as empresas do usuário em um formato adequado para o formulário
  const empresas =
    user?.empresas.map((empresa) => ({
      label: empresa.empresa.razao_social,
      add: false,
    })) || [];

  const role = user?.role;

  const [currentUser, setCurrentUser] = React.useState<currentUserType>({
    nome: "",
    email: "",
    empresas: empresas,
    role: {
      label: role?.descricao || "",
      value: role?.id || "",
    },
  });

  return (
    <Form.Root
      /*       action={formAction} */
      className="flex flex-col gap-4 *:border-b-1 *:border-slate-200 *:pb-6"
    >
      <UsuariosInfosForm />
      <UsuarioEmpresasForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <UsuariosPemissoesForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        roles={roles}
      />
      <PrimaryButton
        text="Cadastrar "
        className="bg-secondary self-end rounded-xl hover:bg-secondary/90"
        icon={Check}
        type="submit"
      />
    </Form.Root>
  );
}
