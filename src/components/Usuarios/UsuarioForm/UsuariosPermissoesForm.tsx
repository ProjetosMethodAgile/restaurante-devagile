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
}: currentUserProps & { roles: RoleBase[] | null }) {
  const [telas, setTelas] = useState<TelaBase[]>([]);

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

      // Limpa os acessos ao trocar de perfil
      setCurrentUser((prev) => ({ ...prev, telas: [] }));
    }

    if (currentUser?.roleId) {
      criaObjetoPermissoes();
    }
  }, [currentUser.roleId]);

  const handleToggleTela = (tela: TelaBase | SubtelaBase) => {
    const isSelecionada = currentUser.telas.some((t) => t.id === tela.id);
    const novasTelas = isSelecionada
      ? currentUser.telas.filter((t) => t.id !== tela.id)
      : [...currentUser.telas, tela];

    setCurrentUser({ ...currentUser, telas: novasTelas });
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
            // onClick={handleAcessoTotal}
            className="text-sm text-blue-400 cursor-pointer underline hover:underline"
          >
            Acesso total
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {telas.length > 0 ? (
            telas.map((tela) => {
              const checked = currentUser.telas.some((t) => t.id === tela.id);

              const checkedStatusData = telas.some(
                (telaData) => telaData.id === tela.id
              );

              return (
                <div key={tela.id}>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={checkedStatusData ? checkedStatusData : checked}
                      onChange={() => handleToggleTela(tela)}
                    />
                    {tela.nome}
                  </label>

                  {tela.subtelas && tela.subtelas.length > 0 && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {tela.subtelas.map((subtela: SubtelaBase) => {
                        const subChecked = currentUser.telas.some(
                          (t) => t.id === subtela.id
                        );
                        
                        
                        const checkedStatusData = tela.subtelas.some((telaData) =>
                         telaData.id === subtela.id
                        );

                        return (
                          <label
                            key={subtela.id}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <input
                              type="checkbox"
                              checked={
                                checkedStatusData
                                  ? checkedStatusData
                                  : subChecked
                              }
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
