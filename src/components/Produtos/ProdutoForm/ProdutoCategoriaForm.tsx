import React, { Dispatch, SetStateAction } from "react";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Check, Plus, X } from "lucide-react";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { currentProdutoType } from "./ProdutoForm";

type ProdutoCategoriaFormProps = {
    currentProduto: currentProdutoType | null;
    setCurrentProduto: Dispatch<SetStateAction<currentProdutoType | null>>;
    categorias: CategoriaBase[];
};

export default function ProdutoCategoriaForm({
    currentProduto,
    setCurrentProduto,
    categorias,
}: ProdutoCategoriaFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-2 col-span-full">
            <div>
                <SecondaryTitle title="Categorias Disponíveis" />
                <ul className="bg-slate-50 flex flex-col gap-4 h-30 overflow-y-auto p-4 rounded-xl">
                    {categorias.map((categoria) => {
                        const jaAdicionada = currentProduto?.categorias.some(
                            (e) => e.id === categoria.id
                        );

                        return (
                            <li
                                key={categoria.id}
                                className="flex items-center gap-2 justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full" style={{background: categoria.cor_hex}}></span>
                                    {categoria.nome}
                                </div>

                                {jaAdicionada ? (
                                    <span title="Categoria Adicionada">
                                        <Check
                                            size={18}
                                            className="bg-green-500 rounded-full text-white p-0.5"
                                        />
                                    </span>
                                ) : (
                                    <span title="Adicionar Categoria">
                                        <Plus
                                            size={18}
                                            className="bg-secondary rounded-full min-w-4 min-h-4 text-white p-0.5 cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setCurrentProduto((prev) => {
                                                    if (!prev) return prev;
                                                    return {
                                                        ...prev,
                                                        categorias: [
                                                            ...prev.categorias,
                                                            {
                                                                id: categoria.id,
                                                                nome: categoria.nome,
                                                                cor_hex: categoria.cor_hex,
                                                                codigo: categoria.codigo,
                                                                empresa: categoria.empresa,
                                                            },
                                                        ],
                                                    };
                                                });
                                            }}
                                        /></span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="h-full">
                <SecondaryTitle title="Categorias Vinculadas" />
                <ul className="flex gap-2 self-start flex-wrap h-30 p-4 border rounded-xl border-secondary/20 overflow-y-auto">
                    {currentProduto && currentProduto.categorias.length > 0 ? (
                        currentProduto.categorias.map((categoria) => (
                            <li
                                key={categoria.id}
                                style={{backgroundColor: categoria.cor_hex}}
                                className={`flex items-center gap-2 justify-between bg-secondary/10 py-1 px-4 rounded-xl self-start`}
                            >
                                <span>{categoria.nome}</span>
                                <span title="Remover Categoria">
                                    <X
                                        size={15}
                                        className="bg-slate-700 rounded-full hover:scale-105 transition-all cursor-pointer text-white p-0.5"
                                        onClick={() => {
                                            setCurrentProduto((prev) => {
                                                if (!prev) return prev;
                                                return {
                                                    ...prev,
                                                    categorias: prev.categorias.filter(
                                                        (c) => c.id !== categoria.id
                                                    ),
                                                };
                                            });
                                        }}
                                    /></span>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-600">Nenhuma categoria adicionada</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
