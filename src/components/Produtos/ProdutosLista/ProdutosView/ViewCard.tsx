'use client'
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { Package2 } from "lucide-react";

type ViewListProps = {
  produtos: ProdutoBase[] | null;
  openUpdateForm: (produto_id: string) => void;
};

export default function ViewCard({ produtos, openUpdateForm }: ViewListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produtos && produtos.length > 0 ? (
        produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
            onClick={()=> openUpdateForm(produto.id)}
          >
            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-base">
              <Package2 className="text-blue-600 w-5 h-5" />
              {produto.nome}
            </div>
            <div className="text-sm text-gray-500 mb-1">
              Código: <span className="font-medium">{produto.codigo}</span>
            </div>
            <div className="text-sm mb-1">
              Categorias:{" "}
              {produto.categorias.map((c) => {
                return (
                  <span
                    key={c.id}
                    className="py-1 font-medium text-slate-800 px-2 rounded-xl"
                    style={{ backgroundColor: c.cor_hex }}
                  >
                    {c.nome}
                  </span>
                );
              })}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {produto.descricao || (
                <span className="italic text-gray-400">Sem descrição</span>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-2">
              {produto.variacoes.length > 0 ? (
                produto.variacoes.map((v) => (
                  <div
                    key={v.id}
                    className="flex justify-between items-center text-sm px-3 py-1 rounded bg-blue-50 text-blue-800 font-medium"
                  >
                    <span>{v.nome}</span>
                    <span className="font-semibold">
                      R$ {v.preco.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">
                  Sem variações
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          Nenhum produto cadastrado
        </div>
      )}
    </div>
  );
}
