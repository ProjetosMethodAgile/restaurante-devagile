import OrderActions from "../OrderActions";
import OrderStatusBadge from "../OrderStatusBadge";

type OrderCardProps = {
  orderId: string;
  clientName: string;
  emissionDate: string;
  emissionTime: string;
  items: number;
  amount: number;
  status: "pendente" | "concluido" | "cancelado";
};

export default function OrderCard({
  orderId,
  clientName,
  emissionDate,
  emissionTime,
  items,
  amount,
  status,
}: OrderCardProps) {
  return (
    <div
      id="card"
      className="shadow-md bg-white rounded-xl p-8 flex gap-4 flex-col"
    >
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="font-semibold">Pedido #{orderId}</h3>
          <p className="text-text-secondary">{clientName}</p>
        </div>
        <OrderStatusBadge status={status} />
      </div>
      <div className="text-text-secondary text-sm  flex flex-col justify-between">
        <p>Emissão: {emissionDate}</p>
        <p>Horario: {emissionTime}</p>
        <p>Itens: {items}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold ">R$ {amount}</p>
        <OrderActions />
      </div>
    </div>
  );
}
