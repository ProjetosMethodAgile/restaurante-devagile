export default function GenericSelectInput() {
  return (
    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
      <option>Todos os pedidos</option>
      <option>Pendentes</option>
      <option>Concluídos</option>
    </select>
  );
}
