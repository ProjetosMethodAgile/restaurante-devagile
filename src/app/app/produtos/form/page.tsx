import ProdutoForm from "@/src/components/Produtos/ProdutoForm/ProdutoForm";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProdutoFormPage() {
  return (
    <section>
      <div className="flex items-center gap-4 container-global m-4">
        <Link href="/app/produtos">
          <ArrowLeft className="hover:-translate-x-1 transition-all cursor-pointer" />
        </Link>
        <PrimaryTitle title="Cadastro de produto" />
      </div>
      <div className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl container-global shadow-md">
        <ProdutoForm />
      </div>
    </section>
  );
}
