export default function OrderActions() {
  return (
    <div className="flex gap-2 *:transition-all">
      <button className="bg-blue-200 hover:bg-blue-300 cursor-pointer py-1 px-2 rounded-lg text-blue-900">
        Detalhes
      </button>
      <button className="bg-green-200 hover:bg-green-300 cursor-pointer py-1 px-2 rounded-lg text-green-900">
        Concluir
      </button>
    </div>
  );
}
