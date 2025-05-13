import OrderActions from "./OrderActions";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard() {
  return (
    <div
      id="card"
      className="shadow-md bg-white rounded-xl p-8 flex gap-4 flex-col"
    >
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="font-semibold">Pedido #1</h3>
          <p className="text-text-secondary">Manuel Oliveira</p>
        </div>
        <OrderStatusBadge status="cancelado" />
      </div>
      <div className="text-text-secondary text-sm  flex flex-col justify-between">
        <p>Emissão: 12/05/2025</p>
        <p>Horario: 10:30</p>
        <p>Itens: 2</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold ">R$ 29,90</p>
        <OrderActions />
      </div>
    </div>
  );
}
