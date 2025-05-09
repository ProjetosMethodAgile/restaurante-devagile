import { Form } from "../components/Form";

export default function Logi() {
  return <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <Form.Root>
      <Form.InputAll icone="Voltar"  type="text" placeholder="Digite seu usuario"/>
    </Form.Root>
  </div>;
}
