import SecondaryButton from "@/src/utils/UI/SecondaryButton";
import { Check, Info } from "lucide-react";

export default function OrderActions() {
  return (
    <div className="flex gap-2 *:transition-all">
      <SecondaryButton
        className="bg-blue-200 border-1 border-blue-300/50 hover:bg-blue-300 text-blue-900"
        icon={Info}
        text="Detalhes"
      />
      <SecondaryButton
        className="bg-green-200 hover:bg-green-300 text-green-900"
        icon={Check}
        text="Concluir"
      />
    </div>
  );
}
