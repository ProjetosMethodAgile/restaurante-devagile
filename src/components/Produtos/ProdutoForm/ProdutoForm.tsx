import { Form } from "../../UI/Form";
import SecondaryTitle from "../../UI/SecondaryTitle";

export default function ProdutoForm() {
  return (
    <Form.Root>
      <div>
        <SecondaryTitle title="Informações Basicas" />
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
          <Form.InputText
            label="SKU"
            name="sku"
            type="text"
            placeholder="PRATO-001"
          />
          <Form.InputText
            label="Nome do Produto"
            type="text"
            placeholder="Feijoada Completa"
            name="nome_produto"
          />
          <Form.InputOptions
            label="Categoria"
            options={[{ label: "Comidas", value: "1" }]}
          />
          <Form.InputText
            label="Preço Base"
            type="text"
            placeholder="R$ 28,99"
            name="preco"
          />
          <Form.InputText
            label="Descrição"
            type="text"
            placeholder="Feijoada, Arroz, Batata..."
            name="descricao_produto"
          />
        </div>
      </div>

      <div>
        <SecondaryTitle title="Variações" />
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
          <Form.InputText
            label="SKU"
            name="sku"
            type="text"
            placeholder="PRATO-001"
          />
          <Form.InputText
            label="Nome do Produto"
            type="text"
            placeholder="Feijoada Completa"
            name="nome_produto"
          />
          <Form.InputOptions
            label="Categoria"
            options={[{ label: "Comidas", value: "1" }]}
          />
          <Form.InputText
            label="Preço Base"
            type="text"
            placeholder="R$ 28,99"
            name="preco"
          />
          <Form.InputText
            label="Descrição"
            type="text"
            placeholder="Feijoada, Arroz, Batata..."
            name="descricao_produto"
          />
        </div>
      </div>
    </Form.Root>
  );
}
