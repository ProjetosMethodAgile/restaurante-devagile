import OrderCard from "./OrderCard";

const orders = [
  {
    orderId: "001",
    clientName: "João Silva",
    emissionDate: "2025/05/10",
    emissionTime: "14:32",
    items: [
      { name: "Camisa Polo", quantity: 2, price: 79.9 },
      { name: "Calça Jeans", quantity: 1, price: 149.9 },
    ],
    amount: 309.7,
    status: "pendente",
  },
  {
    orderId: "002",
    clientName: "Maria Oliveira",
    emissionDate: "2025/05/11",
    emissionTime: "09:15",
    items: [
      { name: "Tênis Esportivo", quantity: 1, price: 199.9 },
      { name: "Meias", quantity: 3, price: 15.0 },
    ],
    amount: 244.9,
    status: "concluido",
  },
  {
    orderId: "003",
    clientName: "Carlos Pereira",
    emissionDate: "2025/05/12",
    emissionTime: "17:48",
    items: [{ name: "Jaqueta", quantity: 1, price: 299.9 }],
    amount: 299.9,
    status: "cancelado",
  },
    {
    orderId: "004",
    clientName: "Maria Oliveira",
    emissionDate: "2025/05/11",
    emissionTime: "09:15",
    items: [
      { name: "Tênis Esportivo", quantity: 1, price: 199.9 },
      { name: "Meias", quantity: 3, price: 15.0 },
    ],
    amount: 244.9,
    status: "concluido",
  },
    {
    orderId: "005",
    clientName: "Maria Oliveira",
    emissionDate: "2025/05/11",
    emissionTime: "09:15",
    items: [
      { name: "Tênis Esportivo", quantity: 1, price: 199.9 },
      { name: "Meias", quantity: 3, price: 15.0 },
    ],
    amount: 244.9,
    status: "concluido",
  },
    {
    orderId: "006",
    clientName: "Maria Oliveira",
    emissionDate: "2025/05/11",
    emissionTime: "09:15",
    items: [
      { name: "Tênis Esportivo", quantity: 1, price: 199.9 },
      { name: "Meias", quantity: 3, price: 15.0 },
    ],
    amount: 244.9,
    status: "concluido",
  },
];

export default function OrdersGrid() {
  return (
    <section className="grid-cols-3 grid gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.orderId}
          orderId={order.orderId}
          clientName={order.clientName}
          emissionDate={order.emissionDate}
          emissionTime={order.emissionTime}
          items={order.items.length}
          amount={order.amount}
          status={"pendente"}
        />
      ))}
    </section>
  );
}
