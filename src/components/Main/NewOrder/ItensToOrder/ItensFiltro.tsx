import { Form } from "@/src/components/UI/Form";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { Search } from "lucide-react";

type ItensFiltroProps = {
  filteredProdutos: ProdutoBase[];
};

export default function ItensFiltro({ filteredProdutos }: ItensFiltroProps) {
    const searchList = true
  return (
    <div>
      <Form.InputText
        id="busca-cliente"
        label="Buscar Cliente"
        type="text"
        placeholder="Produto ou Codigo"
        icon={Search}
        className="span-full"
       // onChange={(e) => buscaProduto(e.target.value)}
      />
      {searchList && (
        <div className="mt-2 max-h-60 overflow-y-auto z-30 shadow w-150 border absolute bg-white border-gray-300 rounded-lg">
          <ul>
            {filteredProdutos.length > 0 ? (
              filteredProdutos.map((produto) => (
                <li
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
              <li className="text-text-secondary">Nenhum cliente encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
