import { Form } from "@/src/components/Form";
import PrimaryButton from "@/src/utils/UI/PrimaryButton";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import SecondaryTitle from "@/src/utils/UI/SecondaryTitle";
import { Check } from "lucide-react";

export default async function UsuarioFormPage() {
  return (
    <section className=" m-4 *:border-b-[2px] *:pb-6 *:border-slate-100 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <div>
        <SecondaryTitle title="Dados do usuario" />
        <Form.Root className="grid grid-cols-2 gap-4">
          <Form.InputText
            label="Nome"
            type="text"
            placeholder="João da silva"
          />
          <Form.InputText
            label="Email"
            type="email"
            placeholder="usuario@email.com.br"
          />

          <Form.InputOptions label="Empresa" type="text" />
        </Form.Root>
      </div>
      <div>
        <SecondaryTitle title="Permissões" />
        <Form.Root className="grid grid-cols-2 gap-4">
          <Form.InputOptions label="Perfil de acesso" type="text" />
        </Form.Root>
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
      <Form.ButtonChange className="bg-secondary">Cadastrar</Form.ButtonChange>
    </section>
  );
}
