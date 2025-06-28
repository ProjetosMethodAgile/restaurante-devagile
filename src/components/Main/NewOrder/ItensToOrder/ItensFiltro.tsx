import { Form } from "@/src/components/UI/Form";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { Search } from "lucide-react";
import { useState } from "react";

type ItensFiltroProps = {
  produtos: ProdutoBase[];
  selecionarProduto: (produto: ProdutoBase) => void;
};

export default function ItensFiltro({
  produtos,
  selecionarProduto,
}: ItensFiltroProps) {
  const [filteredProdutos, setFilteredProdutos] =
    useState<ProdutoBase[]>(produtos);
  const [searchList, setSearchList] = useState(false);

  const buscaProduto = (value: string) => {
    setSearchList(true);
    if (!value) {
      setSearchList(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const filtered = produtos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(lowerValue) ||
        String(produto.codigo).includes(lowerValue)
    );
    console.log(filtered);
    setFilteredProdutos(filtered);
  };

  return (
    <div>
      <Form.InputText
        id="busca-cliente"
        label="Buscar Produto"
        type="text"
        placeholder="Produto ou Codigo"
        icon={Search}
        className="span-full"
        onChange={(e) => buscaProduto(e.target.value)}
      />
      {searchList && (
        <div className="mt-2 max-h-60 overflow-y-auto z-30 shadow w-150 border absolute bg-white border-gray-300 rounded-lg">
          <ul>
            {filteredProdutos.length > 0 ? (
              filteredProdutos.map((produto) => (
                <li
                  onClick={() => {
                    setSearchList(false);
                    selecionarProduto(produto);
                  }}
                  key={produto.id}
                  className="cursor-pointer items-center gap-4 justify-start grid grid-cols-[auto_1fr] hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                >
                  <span className="text-sm text-text-secondary">
                    Codigo: {produto.codigo}
                  </span>
                  <span className="font-semibold">{produto.nome}</span>
                </li>
              ))
            ) : (
              <li className="text-text-secondary">Nenhum produto encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
