import OrderActions from "../OrderActions";
import OrderStatusBadge from "../OrderStatusBadge";

type OrderRowProps = {
  orderId: string;
  clientName: string;
  emissionDate: string;
  emissionTime: string;
  items: number;
  amount: number;
  status: "pendente" | "concluido" | "cancelado";
};

export default function OrderRow({
  orderId,
  clientName,
  emissionDate,
  emissionTime,
  items,
  amount,
  status,
}: OrderRowProps) {
  return (
    <div
      id="card"
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Informações do pedido */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-md text-gray-800">
            Pedido #{orderId}
          </h3>
          <OrderStatusBadge status={status} />
        </div>

        <div className=" *:text-gray-500 flex text-sm flex-col ">
          <p className=" text-gray-600">{clientName}</p>
          <p>
            Emissão: <span>{emissionDate}</span>
          </p>
          <p>
            Horário: <span>{emissionTime}</span>
          </p>
          <p>
            Itens: <span>{items}</span>
          </p>
        </div>
      </div>

      {/* Valor e ações */}
      <div className="flex flex-col items-start sm:items-end gap-2">
        <p className="text-lg font-bold text-gray-900">R$ {amount}</p>
        <OrderActions />
      </div>
    </div>
  );
}
