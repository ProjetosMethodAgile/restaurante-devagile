import { Form } from "@/src/components/Form";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { Search, ShoppingBasket } from "lucide-react";

export default function HeaderItensToOrder() {
  return (
    <Form.Root>
      <div className="flex items-center justify-between">
        <Form.InputText
          id="produto"
          label="Produto"
          type="text"
          placeholder="Descrição, SKU, codigo de barras..."
          icon={Search}
          className="w-100"
          iconPosition="right"
        />
      </div>
    </Form.Root>
  );
}
