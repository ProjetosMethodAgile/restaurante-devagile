"use client";
import { useState } from "react";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { useRouter } from "next/navigation";
import ViewLista from "./ProdutosView/ViewLista";
import ViewCard from "./ProdutosView/ViewCard";
import ProdutosListaHeader from "./ProdutosListaHeader";
import SecondaryButton from "../../UI/SecondaryButton";
import ProdutosPaginacao from "./ProdutosPaginacao";

type ProdutosListaProps = {
  produtos: ProdutoBase[] | null;
};

export default function ProdutosLista({ produtos }: ProdutosListaProps) {
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);

  const router = useRouter();
  const openUpdateForm = (produto_id: string) => {
    if (produto_id) {
      router.push(`/app/produtos/form/${produto_id}`);
    }
  };

  return (
    <section className="w-full px-4 py-4">
      <ProdutosListaHeader
        modoVisualizacao={modoVisualizacao}
        setModoVisualizacao={setModoVisualizacao}
      />

      {modoVisualizacao === "lista" ? (
        // Modo em Lista
        <ViewLista
          openUpdateForm={openUpdateForm}
          produtosFiltrados={produtosFiltrados}
        />
      ) : (
        // Modo em cards
        <ViewCard openUpdateForm={openUpdateForm} produtos={produtos} />
      )}
    </section>
  );
}
