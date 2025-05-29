import Counter from "@/src/components/UI/Counter";
import { Pen, Trash } from "lucide-react";
import ItemOrder from "./ItemOrder";

export default function AddItensList() {
  return (
    <div className="bg-gray-50 flex flex-col gap-2 mt-4 rounded-md p-4 overflow-y-scroll max-h-100 ">
      <h4 className="text-secondary">Itens Adicionados</h4>
      <ItemOrder />
      <ItemOrder />
      <ItemOrder />
      <ItemOrder />
    </div>
  );
}
