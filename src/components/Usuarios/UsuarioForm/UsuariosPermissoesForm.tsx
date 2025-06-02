import SecondaryTitle from "../../UI/SecondaryTitle";
import { div } from "framer-motion/client";
import { Form } from "../../UI/Form/index";
import { currentUserProps } from "./UsuariosForm";
import { RoleBase } from "@/src/types/role/roleType";

export default function UsuariosPemissoesForm({
  currentUser,
  setCurrentUser,
  roles,
}: currentUserProps & { roles: RoleBase[] }) {
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
        />
      </div>
      <div className="">
        <SecondaryTitle title="Acessos" />
        <div className="space-y-6 text-sm">
          <div>
            <label className="block font-medium text-gray-700  mb-2">
              Pedidos
            </label>
            <div className="ml-4 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Visualizar Pedidos
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Criar Pedido
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Editar Pedido
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Clientes
            </label>
            <div className="ml-4 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Visualizar Clientes
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Editar Dados do Cliente
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Relatórios
            </label>
            <div className="ml-4 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Acesso aos Relatórios Gerais
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Relatório de Vendas
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Relatório de Estoque
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
