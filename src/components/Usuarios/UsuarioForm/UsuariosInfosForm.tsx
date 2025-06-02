import { Form } from "../../UI/Form/index";
import SecondaryTitle from "../../UI/SecondaryTitle";

export default function UsuariosInfosForm() {
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
      </div>
    </div>
  );
}
