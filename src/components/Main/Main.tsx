import PrimaryButton from "@/src/utils/UI/PrimaryButton";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import { Plus } from "lucide-react";

export default function Main() {
  return (
    <main>
      <PrimaryTitle title="Controle de Pedidos" />
      <PrimaryButton>
        <Plus />
        <span>Novo Pedido</span>
      </PrimaryButton>
    </main>
  );
}
