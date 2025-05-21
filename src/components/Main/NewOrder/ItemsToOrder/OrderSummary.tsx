export default function OrderSummary() {
  return (
    <div className="flex flex-col *:flex *:justify-between gap-2 mt-4 self-end">
      <p className="">
        Subtotal
        <span>R$ 28,90</span>
      </p>
      <p>
        Taxa de Entrega
        <span>R$ 28,90</span>
      </p>
      <p className="font-bold text-black">
        Total
        <span>R$ 28,90</span>
      </p>
    </div>
  );
}
