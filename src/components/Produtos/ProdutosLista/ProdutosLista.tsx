"use client";
import { useState } from "react";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { LayoutList, LayoutGrid, Package2, Plus } from "lucide-react";
import clsx from "clsx";
import PrimaryButton from "../../UI/PrimaryButton";
import ProdutosFiltro from "./ProdutosFiltro";
import SecondaryButton from "../../UI/SecondaryButton";
import { useRouter } from "next/navigation";

type ProdutosListaProps = {
  produtos: ProdutoBase[] | null;
};

export default function ProdutosLista({ produtos }: ProdutosListaProps) {
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "cards">(
    "lista"
  );
    const router = useRouter();

  return (
    <section className="w-full px-4 py-4">
      <div className="flex justify-end gap-4 mb-4">
        <ProdutosFiltro />
        <button
          onClick={() =>
            setModoVisualizacao((prev) =>
              prev === "lista" ? "cards" : "lista"
            )
          }
          className="flex items-center gap-2 text-sm px-4 py-2 bg-primary cursor-pointer hover:bg-primary/90 transition-all text-white rounded-lg"
        >
          {modoVisualizacao === "lista" ? (
            <>
              <LayoutGrid size={16} />
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

      {modoVisualizacao === "lista" ? (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Variações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {produtos && produtos.length > 0 ? (
                produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
                      <Package2 className="w-4 h-4 text-blue-600" />
                      {produto.nome}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {produto.codigo}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-block px-2 py-1 text-xs font-semibold rounded-full",
                          produto.tipo === "ativo"
                            ? "bg-green-100 text-green-800"
                            : produto.tipo === "inativo"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {produto.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                      {produto.descricao || (
                        <span className="italic text-gray-400">
                          Sem descrição
                        </span>
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
                        <span className="text-gray-400 italic">
                          Sem variações
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Nenhum produto cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Modo em cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos && produtos.length > 0 ? (
            produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-base">
                  <Package2 className="text-blue-600 w-5 h-5" />
                  {produto.nome}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  Código: <span className="font-medium">{produto.codigo}</span>
                </div>
                <div className="text-sm mb-1">
                  Tipo:{" "}
                  <span
                    className={clsx(
                      "inline-block px-2 py-1 text-xs font-semibold rounded-full",
                      produto.tipo === "ativo"
                        ? "bg-green-100 text-green-800"
                        : produto.tipo === "inativo"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {produto.tipo}
                  </span>
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
      )}
    </section>
  );
}
