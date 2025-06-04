import { Search } from "lucide-react";
import { Form } from "../../UI/Form";

export default function UsuariosFiltro() {
  return (
    <div className="flex-1">
      <Form.InputText
        type="text"
        placeholder="Buscar por nome ou telefone"
        id="search"
        icon={Search}
      />
    </div>
  );
}
