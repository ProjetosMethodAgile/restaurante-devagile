import { Form } from "@/src/components/Form";
import SecondaryButton from "@/src/utils/UI/SecondaryButton";
import { Search, ShoppingBasket } from "lucide-react";

export default function HeaderItensToOrder() {
  return (
    <Form.Root>
      <div className="flex items-center justify-between">
        <Form.InputALL
          id="produto"
          label="Produto"
          type="text"
          placeholder="Nome, SKU, codigo de barras..."
          icon={Search}
          className="w-100"
          iconPosition="left"
        />
        <SecondaryButton
          text="Buscar Item"
          className="bg-secondary self-end text-blue-50 "
          icon={ShoppingBasket}
        />
      </div>
    </Form.Root>
  );
}
