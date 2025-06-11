import { ProdutoBase } from "@/src/types/produto/produtoType";

type ProdutosListaProps = {
  produtos: ProdutoBase[];
};

export default function ProdutosLista({ produtos }: ProdutosListaProps) {
  return (
    <section>
      <ul>
        <li></li>
        {produtos.map((produto) => {
          return <li>{produto.nome}</li>;
        })}
      </ul>
    </section>
  );
}
