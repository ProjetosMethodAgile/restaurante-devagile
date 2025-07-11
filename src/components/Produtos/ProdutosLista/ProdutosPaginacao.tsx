import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SecondaryButton from "../../UI/SecondaryButton";
import { ProdutoBase } from "@/src/types/produto/produtoType";

export default function ProdutosPaginacao({
  setProdutosFiltrados,
  produtosFiltrados,
}: {
  setProdutosFiltrados: Dispatch<SetStateAction<ProdutoBase[] | null>>;
  produtosFiltrados: ProdutoBase[] | null;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalItens = 3;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Paginação atualizada corretamente
  useEffect(() => {
    if (!produtosFiltrados) return;

    const startIndex = currentPage * totalItens;
    const paginated = produtosFiltrados.slice(
      startIndex,
      startIndex + totalItens
    );

    setProdutosFiltrados(paginated);
  }, [currentPage]);

  // Renderização
  if (!produtosFiltrados) return null;

  const totalPages = Math.ceil(produtosFiltrados.length / totalItens);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <SecondaryButton
        disabled={currentPage === 0}
        onClick={() => goToPage(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        text="Anterior"
      />
      {Array.from({ length: totalPages }).map((_, page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <SecondaryButton
        disabled={currentPage === totalPages - 1}
        onClick={() => goToPage(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        text="Próximo"
      />
    </div>
  );
}
