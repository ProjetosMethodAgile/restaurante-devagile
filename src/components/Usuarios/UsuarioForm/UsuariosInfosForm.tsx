import { useUser } from "@/src/context/userContext";
import { Form } from "../../UI/Form/index";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function UsuariosInfosForm() {
  const { user } = useUser();
  console.log("user", user);

  // Pega as empresas do usuario logado
/*   const empresasUsuario =
    user?.usuarioEmpresa.map((empresa) => ({
      value: empresa.empresa_id,
      label: empresa.empresa.razao_social,
    })) || []; */

  const [currentUser, setCurrentUser] = useState({
    nome: "",
    email: "",
    empresas: [
      {
        label: "Dev Agile",
        add: true,
      },
      {
        label: "Mobili comercio",
        add: true,
      },
      {
        label: "Dev Agile",
        add: true,
      },
      {
        label: "Mobili comercio",
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
{/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-2  col-span-full">
          <div>
            <SecondaryTitle title="Empresas disponiveis" />
            <ul className="bg-card flex flex-col gap-4 h-40 overflow-y-auto p-4 rounded-xl">
              {currentUser.empresas.map((empresa) => (
                <li
                  key={empresa.label}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold bg-sky-200 text-sm text-sky-600 rounded-full p-1">
                      DA
                    </span>
                    {empresa.label}
                  </div>
                  {empresa.add && (
                    <Plus
                      size={15}
                      className="bg-secondary rounded-full text-white p-0.5"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full">
            <SecondaryTitle title="Empresas Vinculadas" />
            <ul className="flex gap-2 self-start flex-wrap h-40 p-4 border rounded-xl border-secondary/20 ">
              {currentUser.empresas.length > 0 ? (
                currentUser.empresas.map((empresa) => (
                  <li
                    key={empresa.label}
                    className="flex items-center  gap-2 justify-between bg-secondary/10 py-1 px-4 rounded-xl self-start"
                  >
                    {empresa.label}
                    {empresa.add && (
                      <X
                        size={15}
                        className="bg-primary rounded-full hover:scale-102 transition-all cursor-pointer text-white p-0.5"
                      />
                    )}
                  </li>
                ))
              ) : (
                <li>Nenhuma empresa adicionada</li>
              )}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
