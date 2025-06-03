"use client";
import { useEffect, useState } from "react";
import SecondaryTitle from "../../UI/SecondaryTitle";

import { Form } from "../../UI/Form/index";
import { currentUserProps } from "./UsuariosForm";
import { RoleBase } from "@/src/types/role/roleType";
import getTelasByRoleId from "@/src/actions/telas/getTelasByRoleId";
import { SubtelaBase } from "@/src/types/tela/tela";

export default function UsuariosPermissoesForm({
  currentUser,
  setCurrentUser,
  roles,
}: currentUserProps & { roles: RoleBase[] }) {
  const [telas, setTelas] = useState<any[]>([]);

  useEffect(() => {
    async function criaObjetoPermissoes() {
      const data = await getTelasByRoleId(currentUser.roleId);
      if (data.error) {
        console.error("Erro ao buscar telas:", data.error);
        return;
      }

      const telasFiltradas = data.data?.filter(
        (tela) => tela.tela_parent === null
      );
      setTelas(telasFiltradas || []);
    }

    if (currentUser?.roleId) {
      criaObjetoPermissoes();
    }
  }, [currentUser.roleId]);

  const isChecked = (id: string) => currentUser.telas?.[id]?.ativo ?? false;

  const handleToggleTela = (tela: any) => {
    const isActive = isChecked(tela.id);
    const updated = { ...currentUser.telas };

    if (isActive) {
      delete updated[tela.id];
      tela.subtelas?.forEach((sub: any) => {
        delete updated[sub.id];
      });
    } else {
      updated[tela.id] = { id: tela.id, nome: tela.nome, ativo: true };
    }

    setCurrentUser({ ...currentUser, telas: updated });
  };

  const handleToggleSubtela = (subtela: any) => {
    const isActive = isChecked(subtela.id);
    const updated = { ...currentUser.telas };

    if (isActive) {
      delete updated[subtela.id];
    } else {
      updated[subtela.id] = { id: subtela.id, nome: subtela.nome, ativo: true };
    }

    setCurrentUser({ ...currentUser, telas: updated });
  };

  const handleAcessoTotal = () => {
    const updated = { ...currentUser.telas };

    telas.forEach((tela) => {
      updated[tela.id] = { id: tela.id, nome: tela.nome, ativo: true };
      tela.subtelas?.forEach((sub: any) => {
        updated[sub.id] = { id: sub.id, nome: sub.nome, ativo: true };
      });
    });

    setCurrentUser({ ...currentUser, telas: updated });
  };

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
              const telaChecked = isChecked(tela.id);
              return (
                <div key={tela.id}>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={telaChecked}
                      onChange={() => handleToggleTela(tela)}
                    />
                    {tela.nome}
                  </label>

                  {tela.subtelas && tela.subtelas.length > 0 && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {tela.subtelas.map((subtela: SubtelaBase) => (
                        <label
                          key={subtela.id}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            disabled={!telaChecked}
                            checked={isChecked(subtela.id)}
                            onChange={() => handleToggleSubtela(subtela)}
                          />
                          {subtela.nome}
                        </label>
                      ))}
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
