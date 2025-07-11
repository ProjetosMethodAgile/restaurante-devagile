"use client";
import SecondaryButton from "../components/UI/SecondaryButton";
type PaginacaoProps = {
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};
export default function Paginacao({
  goToPage,
  totalPages,
  currentPage,
}: PaginacaoProps) {
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
