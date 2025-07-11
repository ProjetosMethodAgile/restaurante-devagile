"use client";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { Package2 } from "lucide-react";

type ViewListProps = {
  openUpdateForm: (produto_id: string) => void;
  produtosFiltrados: ProdutoBase[] | null;
};

export default function ViewLista({
  openUpdateForm,
  produtosFiltrados,
}: ViewListProps) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3">Produto</th>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Categorias</th>
            <th className="px-4 py-3">Descrição</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Variações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {produtosFiltrados && produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <tr
                key={produto.id}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => openUpdateForm(produto.id)}
              >
                <td className="px-4 py-3 flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
                  <Package2 className="w-4 h-4 text-blue-600" />
                  {produto.nome}
                </td>
                <td className="px-4 py-3 text-gray-500">{produto.codigo}</td>
                <td className="px-4 py-3 text-xs flex gap-2 flex-wrap">
                  {produto.categorias.map((c) => {
                    return (
                      <span
                        className="py-1 font-medium text-slate-800 px-2 rounded-xl"
                        key={c.id}
                        style={{ backgroundColor: c.cor_hex }}
                      >
                        {c.nome}
                      </span>
                    );
                  })}
                </td>
                <td className="">
                  {produto.descricao || (
                    <span className="italic text-gray-400">Sem descrição</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                  {produto.ativo ? (
                    <span className="text-secondary font-medium">Ativo</span>
                  ) : (
                    <span className="font-medium">Inativo</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {produto.variacoes.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {produto.variacoes.map((v) => (
                        <li
                          key={v.id}
                          className="flex justify-between items-center px-2 py-1 rounded bg-blue-50 text-blue-800 text-sm font-medium"
                        >
                          <span>{v.nome}</span>
                          <span className="font-semibold">
                            R$ {v.preco.toFixed(2).replace(".", ",")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">Sem variações</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                Nenhum produto cadastrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
