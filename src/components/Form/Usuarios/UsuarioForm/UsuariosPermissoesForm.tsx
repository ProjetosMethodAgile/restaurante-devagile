import SecondaryTitle from "@/src/utils/UI/SecondaryTitle";
import { div } from "framer-motion/client";
import { Form } from "../../../Form/index";

export default function UsuariosPemissoesForm() {
  return (
    <div>
      {" "}
      <div>
        <SecondaryTitle title="Permissões" />

        <Form.InputOptions label="Perfil de acesso" type="text" />
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
