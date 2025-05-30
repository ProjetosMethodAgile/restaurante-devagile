import { useUser } from "@/src/context/userContext";
import { Form } from "../../UI/Form/index";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Plus } from "lucide-react";

export default function UsuariosInfosForm() {
  const { user } = useUser();

  // Pega as empresas do usuario logado
  const empresas =
    user?.usuarioEmpresa.map((empresa) => ({
      value: empresa.empresa_id,
      label: empresa.empresa.razao_social,
    })) || [];

  return (
    <div>
      <SecondaryTitle title="Dados do usuario" />
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
        <Form.InputText label="Nome" type="text" placeholder="João da silva" />
        <Form.InputText
          label="Email"
          type="email"
          placeholder="usuario@email.com.br"
        />
        <div>
          <Plus className="bg-primary rounded-full text-white p-0.5" />
          <div>
            <Form.InputOptions label="Empresa" options={empresas} />
            <Form.InputOptions label="Perfil do Usuario" options={empresas} />
          </div>
        </div>
      </div>
    </div>
  );
}
