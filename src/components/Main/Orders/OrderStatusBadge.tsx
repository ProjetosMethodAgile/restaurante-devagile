export default function OrderStatusBadge({
  status,
}: {
  status: "pendente" | "concluido" | "cancelado";
}) {
  const statusBadge = {
    pendente: {
      text: "Pendente",
      color: "bg-yellow-200 text-yellow-900",
    },
    concluido: {
      text: "Concluido",
      color: "bg-green-200 text-green-900",
    },
    cancelado: {
      text: "Cancelado",
      color: "bg-red-200 text-red-900",
    },
  };

  return (
    <span className={`${statusBadge[status]?.color} py-1 px-2 text-center rounded-lg `}>
      {statusBadge[status]?.text}
    </span>
  );
}
