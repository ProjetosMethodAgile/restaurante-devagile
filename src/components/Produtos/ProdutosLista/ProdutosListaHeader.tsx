'use client'
import { LayoutList, Plus } from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import ProdutosFiltro from "./ProdutosFiltro";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type ProdutosListHeaderProps = {
  modoVisualizacao: "lista" | "cards";
  setModoVisualizacao: Dispatch<SetStateAction<"lista" | "cards">>;
};

export default function ProdutosListaHeader({
  modoVisualizacao,
  setModoVisualizacao,
}: ProdutosListHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex justify-end gap-4 mb-4">
      <ProdutosFiltro />
      <button
        onClick={() =>
          setModoVisualizacao((prev) => (prev === "lista" ? "cards" : "lista"))
        }
        className="flex items-center gap-2 text-sm px-4 py-2 bg-primary cursor-pointer hover:bg-primary/90 transition-all text-white rounded-lg"
      >
        {modoVisualizacao === "lista" ? (
          <>
            <LayoutList size={16} />
            Visualizar em cards
          </>
        ) : (
          <>
            <LayoutList size={16} />
            Visualizar em lista
          </>
        )}
      </button>
      <SecondaryButton
        className="bg-secondary text-white"
        text="Adicionar"
        icon={Plus}
        onClick={() => router.push("/app/produtos/form")}
      />
    </div>
  );
}
