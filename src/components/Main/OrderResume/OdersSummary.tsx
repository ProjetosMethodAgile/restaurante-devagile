import { ShoppingBag, Clock, CheckCircle } from "lucide-react";
import SummaryCard from "./SummaryCard";

export default function OrdersSummary() {
  return (
    <div className="flex gap-4">
      <SummaryCard
        icon={<ShoppingBag className="text-blue-600" size={20} />}
        label="Total de Pedidos"
        value={4}
        bgColor="bg-blue-100"
        iconBgColor="bg-blue-200"
        textColor="text-blue-700"
      />
      <SummaryCard
        icon={<Clock className="text-yellow-500" size={20} />}
        label="Pedidos Pendentes"
        value={3}
        bgColor="bg-yellow-100"
        iconBgColor="bg-yellow-200"
        textColor="text-yellow-700"
      />
      <SummaryCard
        icon={<CheckCircle className="text-green-600" size={20} />}
        label="Pedidos Concluídos"
        value={1}
        bgColor="bg-green-100"
        iconBgColor="bg-green-200"
        textColor="text-green-700"
      />
    </div>
  );
}
