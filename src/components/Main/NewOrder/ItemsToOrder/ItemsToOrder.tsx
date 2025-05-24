import { Form } from "../../../Form";
import AddItensList from "./AddItensList";
import HeaderItensToOrder from "./HeaderItensToOrder";
import OrderSummary from "./OrderSummary";

export default function ItemsToOrder() {
  return (
    <Form.Section
      className="col-span-2  bg-white rounded-xl p-4 flex flex-col gap-4 h-full"
      title="Itens do Pedido"
    >
      <HeaderItensToOrder />
      <AddItensList />
    </Form.Section>
  );
}
