"use client";
import { useEffect, useState } from "react";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Form } from "../../UI/Form/index";
import { currentUserProps } from "./UsuariosForm";
import { RoleBase } from "@/src/types/role/roleType";
import getTelasByRoleId from "@/src/actions/telas/getTelasByRoleId";
import { SubtelaBase, TelaBase } from "@/src/types/tela/tela";

export default function UsuariosPermissoesForm({
  currentUser,
  setCurrentUser,
  roles,
  isEditMode,
}: currentUserProps & { roles: RoleBase[] | null; isEditMode?: boolean }) {
  const [telas, setTelas] = useState<TelaBase[]>([]);

  const fetchTelas = async (roleId: string) => {
    const data = await getTelasByRoleId(roleId);
    if (data.error) {
      console.error("Erro ao buscar telas:", data.error);
      return;
    }

    const telasPrincipais =
      data.data?.filter((tela) => tela.tela_parent === null) || [];

    setTelas(telasPrincipais);

    if (!isEditMode && (!currentUser.telas || currentUser.telas.length === 0)) {
      setCurrentUser((prev) => ({ ...prev, telas: [] }));
    }
  };

  // Busca as telas sempre que mudar a roleId
  useEffect(() => {
    if (currentUser.roleId) {
      fetchTelas(currentUser.roleId);
    }
  }, [currentUser.roleId]);

  const handleToggleTela = (tela: TelaBase | SubtelaBase) => {
    const isSelecionada = currentUser.telas.some((t) => t.tela.id === tela.id);

    // Se for uma tela pai
    if ("subtelas" in tela) {
      const novasTelas = isSelecionada
        ? currentUser.telas.filter(
            (t) =>
              t.tela.id !== tela.id &&
              !tela.subtelas?.some((sub) => sub.id === t.tela.id)
          )
        : [
            ...currentUser.telas,
            { tela },
            ...(tela.subtelas?.map((sub) => ({ tela: sub })) || []),
          ];

      setCurrentUser({ ...currentUser, telas: novasTelas });
    } else {
      // É uma subtela
      const parentSelecionada = telas.some(
        (t) =>
          t.subtelas?.some((sub) => sub.id === tela.id) &&
          currentUser.telas.some((t2) => t2.tela.id === t.id)
      );

      if (!parentSelecionada) return; // Subtela não pode ser selecionada se pai não estiver marcado

      const novasTelas = isSelecionada
        ? currentUser.telas.filter((t) => t.tela.id !== tela.id)
        : [...currentUser.telas, { tela }];

      setCurrentUser({ ...currentUser, telas: novasTelas });
    }
  };

  const handleAcessoTotal = () => {
    const todasAsTelas = telas.flatMap((tela) => [
      { tela },
      ...(tela.subtelas?.map((sub) => ({ tela: sub })) || []),
    ]);
    setCurrentUser({ ...currentUser, telas: todasAsTelas });
  };

  if (roles === null) return <div>Carregando roles...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SecondaryTitle title="Permissões" />
        <Form.InputOptions
          label="Perfil de acesso"
          options={roles.map((role) => ({
            value: role.id,
            label: role.nome,
          }))}
          name="roleId"
          value={currentUser.roleId}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, roleId: e.target.value })
          }
        />
      </div>

      <div>
        <div className="flex items-center gap-10">
          <SecondaryTitle title="Acessos" />
          <button
            type="button"
            onClick={handleAcessoTotal}
            className="text-sm text-blue-400 cursor-pointer underline hover:underline"
          >
            Acesso total
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {telas.length > 0 ? (
            telas.map((tela) => {
              const checked = currentUser.telas.some(
                (t) => t.tela.id === tela.id
              );

              return (
                <div key={tela.id}>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleTela(tela)}
                    />
                    {tela.nome}
                  </label>

                  {tela.subtelas && tela.subtelas.length > 0 && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {tela.subtelas.map((subtela) => {
                        const subChecked = currentUser.telas.some(
                          (t) => t.tela.id === subtela.id
                        );

                        const parentChecked = currentUser.telas.some(
                          (t) => t.tela.id === tela.id
                        );

                        return (
                          <label
                            key={subtela.id}
                            className={`flex items-center gap-2 text-sm ${
                              parentChecked ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={subChecked}
                              disabled={!parentChecked}
                              onChange={() => handleToggleTela(subtela)}
                            />
                            {subtela.nome}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Nenhuma tela liberada para este perfil</div>
          )}
        </div>
      </div>
    </div>
  );
}
