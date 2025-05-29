import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import SecondaryButton from "@/src/components/UI/SecondaryButton";

export default function OrderSummary() {
  const [open, setOpen] = useState(false);

  const toggleSummary = () => setOpen((prev) => !prev);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.05)] border-t z-50 p-3 sm:p-4">
      {/* Topo: Total e botão de expandir/recolher */}
      <div className="flex justify-between items-center text-sm font-semibold text-black">
        <span>Total</span>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">R$ 33,90</span>
          <button
            onClick={toggleSummary}
            className="text-gray-600 hover:text-black transition"
            aria-label="Mostrar detalhes"
          >
            {open ? (
              <ChevronDown
                className="bg-primary text-white rounded-md p-0.5"
                size={18}
              />
            ) : (
              <ChevronUp
                className="bg-primary text-white rounded-md p-0.5"
                size={18}
              />
            )}
          </button>
        </div>
      </div>

      {/* Quando expandido: mostrar detalhes e dois botões */}
      {open ? (
        <>
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ 28,90</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega</span>
              <span>R$ 5,00</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <SecondaryButton
              text="Finalizar"
              className="bg-secondary text-white w-full"
            />
            <SecondaryButton
              text="Salvar Orçamento"
              className="bg-amber-500 text-white w-full"
            />
          </div>
        </>
      ) : (
        // Quando recolhido: apenas botão de finalizar orçamento
        <div className="mt-3">
          <SecondaryButton
            text="Finalizar"
            className="bg-secondary text-white w-full "
          />
        </div>
      )}
    </div>
  );
}
