"use client";
import { useEffect, useState } from "react";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { useRouter } from "next/navigation";
import ViewLista from "./ProdutosView/ViewLista";
import ViewCard from "./ProdutosView/ViewCard";
import ProdutosListaHeader from "./ProdutosListaHeader";
import Paginacao from "@/src/utils/Paginacao";

type ProdutosListaProps = {
  produtos: ProdutoBase[] | null;
};

type CurrenFiltroProps = {
  status: "ativo" | "inativo" | "ambos";
  inputFilter: string;
};

export default function ProdutosLista({ produtos }: ProdutosListaProps) {
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoBase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFiltro, setCurrentFiltro] = useState<CurrenFiltroProps>({
    status: "ativo",
    inputFilter: "",
  });
  const pageSize = 10;
  const router = useRouter();

  const openUpdateForm = (produto_id: string) => {
    if (produto_id) {
      router.push(`/app/produtos/form/${produto_id}`);
    }
  };

  useEffect(() => {
    if (!produtos) return;

    const filtrados = produtos.filter((p) => {
      const nomeMatch = p.nome
        .toLowerCase()
        .includes(currentFiltro.inputFilter.toLowerCase());
      const codigoMatch = String(p.codigo).includes(currentFiltro.inputFilter);

      let statusMatch = true;
      if (currentFiltro.status === "ativo") {
        statusMatch = p.ativo === true;
      } else if (currentFiltro.status === "inativo") {
        statusMatch = p.ativo === false;
      }

      return statusMatch && (nomeMatch || codigoMatch);
    });

    setProdutosFiltrados(filtrados);
    setCurrentPage(1); // reseta página quando muda o filtro
  }, [produtos, currentFiltro]);

  const totalPages = Math.ceil(produtosFiltrados.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = produtosFiltrados.slice(startIndex, endIndex);
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full px-4 py-4">
      <ProdutosListaHeader
        modoVisualizacao={modoVisualizacao}
        setModoVisualizacao={setModoVisualizacao}
        setCurrentFiltro={setCurrentFiltro}
        currentFiltro={currentFiltro}
      />

      {modoVisualizacao === "lista" ? (
        <ViewLista
          openUpdateForm={openUpdateForm}
          produtosFiltrados={paginated}
        />
      ) : (
        <ViewCard openUpdateForm={openUpdateForm} produtos={paginated} />
      )}

      <Paginacao
        goToPage={goToPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </section>
  );
}
