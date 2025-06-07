"use client";
import { Form } from "../../UI/Form";
import React, { useActionState, useEffect, useTransition } from "react";
import UsuariosInfosForm from "./UsuariosInfosForm";
import UsuariosPermissoesForm from "./UsuariosPermissoesForm";
import PrimaryButton from "../../UI/PrimaryButton";
import { Check, LoaderCircle } from "lucide-react";
import UsuarioEmpresasForm from "./UsuariosEmpresasForm";
import { useUser } from "@/src/context/userContext";
import { RoleBase } from "@/src/types/role/roleType";
import { postUser } from "@/src/actions/user/postUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UsuarioBase } from "@/src/types/user/userType";
import { patchUser } from "@/src/actions/user/patchUser";
import { SubtelaBase, TelaBase } from "@/src/types/tela/tela";

type UsuarioFormProps = {
  roles: RoleBase[] | null;
  isEditMode?: boolean;
  editData?: UsuarioBase | null;
};

export type currentUserType = {
  nome: string;
  email: string;
  empresaIds: {
    id: string;
    nome: string;
  }[];
  roleId: string;
  telas: {
    tela: TelaBase | SubtelaBase;
  }[];
};

export type currentUserProps = {
  currentUser: currentUserType;
  setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType>>;
};

export default function UsuarioForm({
  roles,
  editData,
  isEditMode,
}: UsuarioFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    isEditMode ? patchUser : postUser,
    {
      errors: [],
      msg_success: "",
      success: false,
    }
  );

  const { user } = useUser();

  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((erro: string) => toast.error(erro));
    }

    if (state?.success) {
      toast.success(state.msg_success);

      startTransition(() => {
        router.push("/app/usuarios");
      });
    }
  }, [state.success, state.errors, state.msg_success, router]);

  const empresas =
    user?.empresas.map((empresa) => ({
      label: empresa.empresa.razao_social,
      value: empresa.empresa.id,
    })) || [];

  const [currentUser, setCurrentUser] = React.useState<currentUserType>({
    nome: editData?.nome || "",
    email: editData?.email || "",
    empresaIds:
      editData?.empresas?.map((e) => ({
        id: e.empresa.id,
        nome: e.empresa.razao_social,
      })) || [],
    roleId: editData?.role?.id || "",
    telas:
      editData?.telas?.map(
        (t: any) => ("tela" in t ? t : { tela: t }) // garante que cada item tenha a estrutura { tela: ... }
      ) || [],
  });

  return (
    <Form.Root
      action={formAction}
      className="flex flex-col gap-4 *:border-b-1 *:border-slate-200 *:pb-6"
    >
      <UsuariosInfosForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <UsuarioEmpresasForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        empresas={empresas}
      />

      <UsuariosPermissoesForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        roles={roles}
      />

      <div className="flex justify-end mt-4">
        <PrimaryButton
          text={
            isPending ? "Salvando..." : isEditMode ? "Atualizar" : "Cadastrar"
          }
          className="bg-secondary rounded-xl hover:bg-secondary/90"
          icon={isPending ? LoaderCircle : Check }
          type="submit"
          disabled={isPending}
          isPending
        />
      </div>

      {/* Hidden inputs para envio via formulário */}
      <input
        type="hidden"
        name="empresaIds"
        value={JSON.stringify(currentUser.empresaIds.map((e) => e.id))}
      />

      {isEditMode && editData?.id && (
        <input type="hidden" name="userId" value={editData.id} />
      )}

      <input
        type="hidden"
        name="telaIds"
        value={JSON.stringify(currentUser.telas.map((t) => t.tela.id))}
      />
    </Form.Root>
  );
}
