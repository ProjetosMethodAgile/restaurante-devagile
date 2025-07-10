"use client";
import { useActionState, useEffect, useState } from "react";
import { Form } from "../../UI/Form";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import { postProduto } from "@/src/actions/produtos/postProduto";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/userContext";
import ProdutoInfoForm from "./ProdutoInfoForm";
import ProdutoFormVariacoes from "./ProdutoFormVariacoes";
import { ProdutoFormSubmit } from "./ProdutoFormSubmit";
import { ProdutoBase } from "@/src/types/produto/produtoType";
import { patchProduto } from "@/src/actions/produtos/patchProduto";

type ProdutoFormType = {
  categorias: CategoriaBase[] | [];
  variacoes: VariacaoBase[] | [];
  isEditMode?: boolean;
  editData?: ProdutoBase | null;
};

export type currentProdutoType = {
  codigo: string;
  nome: string;
  descricao: string;
  preco: string;
  categorias: CategoriaBase[];
  tipo_produto: "unico" | "variavel";
  ativo: boolean;
  id: string;
  variacoes: {
    variacao_id: string;
    nome: string;
    variacao_preco: number
  }[];
};

export type VariacaoState = {
  sku: string;
  variacao_id: string;
  variacao_preco: string;
};

export default function ProdutoForm({
  categorias,
  variacoes,
  editData = null,
  isEditMode = false,
}: ProdutoFormType) {

  const [currentProduto, setCurrentProduto] =
    useState<currentProdutoType | null>({
      id: editData?.id || "",
      nome: editData?.nome || "",
      descricao: editData?.descricao || "",
      categorias: editData?.categorias || [],
      tipo_produto: isTipoProduto(editData?.tipo) ? editData!.tipo : "unico",
      ativo: editData?.ativo || true,
      codigo: editData?.codigo || "",
      preco:
        editData?.variacoes.length === 1
          ? String(editData?.variacoes[0].preco)
          : "",
      variacoes:
        editData?.variacoes.map((variacao) => {
          return {
            variacao_id: variacao.id,
            nome: variacao.nome,
            variacao_preco: variacao.preco,
          };
        }) || [],
    });

  const [variacoesData, setVariacoesData] = useState<VariacaoState[] | []>([
    {
      variacao_preco: "",
      sku: "",
      variacao_id: "",
    },
  ]);
  const [preco, setPreco] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    isEditMode ? patchProduto : postProduto,
    {
      errors: [],
      msg_success: "",
      success: false,
    }
  );

  function isTipoProduto(tipo: any): tipo is "unico" | "variavel" {
    return tipo === "unico" || tipo === "variavel";
  }

  //realiza funcões após o feedback do formularop
  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((erro: string) => toast.error(erro));
    }

    if (state?.success) {
      toast.success(state.msg_success);
      router.push("/app/produtos");
    }
  }, [state.success, state.errors, state.msg_success, router]);

  //adiciona nova variação na listagem
  const addVariacao = () => {
    setCurrentProduto((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        variacoes: [
          ...prev.variacoes,
          {
            variacao_id: "",
            nome: "",
            variacao_preco: 0,
          },
        ],
      };
    });
  };

  //seta o preço base como preço das variações
  const setPrecoBase = (checked: boolean) => {
    if (checked) {
      setVariacoesData((prev) => {
        const updateVariacoes = prev.map((variacao) => {
          return {
            ...variacao,
            preco_variacao: String(preco), // ou outro valor padrão
          };
        });

        return updateVariacoes;
      });
    } else {
      setVariacoesData((prev) => {
        const updateVariacoes = prev.map((variacao) => {
          return {
            ...variacao,
            preco_variacao: "", // ou outro valor padrão
          };
        });

        return updateVariacoes;
      });
    }
  };

  return (
    <Form.Root action={formAction}>
      <ProdutoInfoForm
        categorias={categorias}
        currentProduto={currentProduto}
        setCurrentProduto={setCurrentProduto}
      />
      <ProdutoFormVariacoes
        addVariacao={addVariacao}
        setPrecoBase={setPrecoBase}
        variacoes={variacoes}
        variacoesData={variacoesData}
        setCurrentProduto={setCurrentProduto}
        currentProduto={currentProduto}
      />
      <ProdutoFormSubmit isEditMode={isEditMode} isPending={isPending} />
      <input
        type="hidden"
        name="empresaIds"
        value={JSON.stringify(user?.empresas.map((e) => e.empresa.id))}
      />
     
      <input type="hidden" name="default_variacao_id" value={""} />
      <input type="hidden" name="produto_id" value={editData?.id} />
      <input
        type="hidden"
        name="categorias"
        value={JSON.stringify(currentProduto?.categorias.map((c) => c.id) ?? [])}
      />
    </Form.Root>
  );
}
