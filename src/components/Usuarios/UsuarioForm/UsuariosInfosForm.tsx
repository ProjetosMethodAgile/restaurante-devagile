import { useUser } from "@/src/context/userContext";
import { Form } from "../../UI/Form/index";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function UsuariosInfosForm() {
  const { user } = useUser();

  // Pega as empresas do usuario logado
  const empresasUsuario =
    user?.usuarioEmpresa.map((empresa) => ({
      value: empresa.empresa_id,
      label: empresa.empresa.razao_social,
    })) || [];

  const [currentUser, setCurrentUser] = useState({
    nome: "",
    email: "",
    empresas: [
      {
        label: "Dev Agile",
        add: true,
      },
      {
        label: "Dev Agile",
        add: true,
      },
    ],
  });

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
          <div className="flex items-center">
            <Form.InputOptions label="Empresa" options={empresasUsuario} />
            <Plus className="bg-primary rounded-full text-white p-0.5" />
          </div>
          <div>
            <ul className="grid grid-cols-[1fr_0.2fr] py-1 px-4 border *:first:border-b rounded-xl">
              {currentUser.empresas.map((empresa) => (
                <>
                  <li>{empresa.label}</li>
                  <li>
                    <input
                      checked={empresa.add}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
