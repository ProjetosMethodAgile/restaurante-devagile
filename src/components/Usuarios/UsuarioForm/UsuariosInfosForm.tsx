import { Form } from "../../UI/Form/index";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { currentUserProps } from "./UsuariosForm";

export default function UsuariosInfosForm({
  currentUser,
  setCurrentUser,
}: currentUserProps) {
  return (
    <div>
      <SecondaryTitle title="Dados do usuario" />
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
        <Form.InputText
          label="Nome"
          name="nome"
          type="text"
          placeholder="João da silva"
          value={currentUser.nome}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, nome: e.target.value })
          }
        />
        <Form.InputText
          label="Email"
          type="email"
          placeholder="usuario@email.com.br"
          name="email"
          value={currentUser.email}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, email: e.target.value })
          }
        />
      </div>
    </div>
  );
}
