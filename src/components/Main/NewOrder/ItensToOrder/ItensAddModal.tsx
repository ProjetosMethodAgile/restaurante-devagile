import { ProdutoBase } from "@/src/types/produto/produtoType";
import ItensFiltro from "./ItensFiltro";
import { useState } from "react";

export default function ItensAddModal({produtos}: {produtos: ProdutoBase[]}) {
  const [filteredProdutos,setFilteredProdutos] = useState(produtos)
  return (
    <div>
      <ItensFiltro filteredProdutos={filteredProdutos} />
    </div>
  );
}
