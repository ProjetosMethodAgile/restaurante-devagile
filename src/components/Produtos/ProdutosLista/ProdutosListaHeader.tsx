"use client";
import { LayoutList, Plus, Search } from "lucide-react";
import SecondaryButton from "../../UI/SecondaryButton";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Form } from "../../UI/Form";

type ProdutosListHeaderProps = {
  modoVisualizacao: "lista" | "cards";
  setModoVisualizacao: Dispatch<SetStateAction<"lista" | "cards">>;
  setCurrentFiltro: Dispatch<
    SetStateAction<{
      status: "ativo" | "inativo" | "ambos";
      inputFilter: string;
    }>
  >;
  currentFiltro: {
    status: "ativo" | "inativo" | "ambos";
    inputFilter: string;
  };
};

export default function ProdutosListaHeader({
  modoVisualizacao,
  setModoVisualizacao,
  setCurrentFiltro,
  currentFiltro,
}: ProdutosListHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex justify-end gap-4 mb-4">
      <div className="flex-1">
        <Form.InputText
          type="text"
          placeholder="Buscar por nome ou código do produto"
          id="search"
          icon={Search}
          onChange={(e) =>
            setCurrentFiltro((prev) => ({
              ...prev,
              inputFilter: e.target.value,
            }))
          }
        />
      </div>
      <Form.InputOptions
        options={[
          { label: "Ativo", value: "ativo" },
          { label: "Inativo", value: "inativo" },
          { label: "Ambos", value: "ambos" },
        ]}
        onChange={(e) =>
          setCurrentFiltro((prev) => {
            const statusValue = e.target.value;

            if (
              statusValue === "ativo" ||
              statusValue === "inativo" ||
              statusValue === "ambos"
            ) {
              return {
                ...prev,
                status: e.target.value as "ativo" | "inativo" | "ambos",
              };
            }
            return prev;
          })
        }
        value={currentFiltro.status}
      />
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
