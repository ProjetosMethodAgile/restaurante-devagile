import getCategoriasByEmp from "@/src/actions/categorias/getCategoriasByEmp";
import getProdutoId from "@/src/actions/produtos/getProdutoId";
import getVariacoesByEmp from "@/src/actions/variacoes/getVariacoesByEmp";
import ProdutoForm from "@/src/components/Produtos/ProdutoForm/ProdutoForm";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type AtualizarProdutosProps = {
  params: Promise<{ id: string; empresaTag: string }>;
};

export default async function ProdutoFormUpdatePage({params}: AtualizarProdutosProps) {
  const categorias = await (await getCategoriasByEmp()).data
  const variacoes = await (await getVariacoesByEmp()).data
  const produto = await (await getProdutoId((await params).id)).data; 
  if (!categorias) return <p className="text-red-500">Não foi possivel obter os categorias</p>;
  if (!variacoes) return <p className="text-red-500">Não foi possivel obter os variacoes</p>;
  
  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4">
        <Link href="/app/produtos">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>
        <PrimaryTitle title="Cadastro de produto" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <ProdutoForm editData={produto} isEditMode categorias={categorias} variacoes={variacoes} />
      </div>
    </section>
  );
}
