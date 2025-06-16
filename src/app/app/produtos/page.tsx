import getProdutos from "@/src/actions/produtos/getProdutos";
import ProdutosLista from "@/src/components/Produtos/ProdutosLista/ProdutosLista";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

export default async function ProdutosListPage() {
  const produtos = await (await getProdutos()).data;


  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4">
        <PrimaryTitle title="Produtos" />
      </div>
      <div className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <ProdutosLista produtos={produtos} />
      </div>
    </section>
  );
}
