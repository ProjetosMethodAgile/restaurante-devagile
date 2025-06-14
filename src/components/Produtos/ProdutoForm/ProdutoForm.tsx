"use client";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Form } from "../../UI/Form";
import PrimaryButton from "../../UI/PrimaryButton";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Check, LoaderCircle, Plus, Trash2Icon } from "lucide-react";
import { CategoriaBase } from "@/src/types/categoria/categoriaType";
import { VariacaoBase } from "@/src/types/variacoes/variacoesType";
import { postProduto } from "@/src/actions/produtos/postProduto";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/userContext";
import ProdutoInfoForm from "./ProdutoInfoForm";
import ProdutoFormVariacoes from "./ProdutoFormVariacoes";
import { ProdutoFormSubmit } from "./ProdutoFormSubmit";

type ProdutoFormType = {
  categorias: CategoriaBase[] | [];
  variacoes: VariacaoBase[] | [];
};

export type VariacaoState = {
  sku: string;
  variacao_id: string;
  variacao_preco: string;
};

export default function ProdutoForm({
  categorias,
  variacoes,
}: ProdutoFormType) {
  const [isPending, startTransition] = useTransition();
  const [variacoesData, setVariacoesData] = useState<VariacaoState[] | []>([
    {
      variacao_preco: "",
      sku: "",
      variacao_id: "",
    },
  ]);
  const [preco, setPreco] = useState<string>("");
  const [tipoProduto, setTipoProduto] = useState<string>("unico");

  const { user } = useUser();
  const router = useRouter();
  const isEditMode = true;
  const [state, formAction] = useActionState(postProduto, {
    errors: [],
    msg_success: "",
    success: false,
  });

  //realiza funcões após o feedback do formularop
  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((erro: string) => toast.error(erro));
    }

    if (state?.success) {
      toast.success(state.msg_success);

      startTransition(() => {
        router.push("/app/produtos");
      });
    }
  }, [state.success, state.errors, state.msg_success, router]);

  //rastreia a mudança nos inputs e atualiza o estado
  const handleChange = (
    idx: number,
    target: EventTarget & { name?: string; value?: string }
  ) => {
    const { name, value } = target;

    if (!name) return; // Se não tem nome, não atualiza

    setVariacoesData((prev) => {
      const newVariacoes = [...prev];

      // Para sku e variacaoId (ou outros campos)
      newVariacoes[idx] = {
        ...newVariacoes[idx],
        [name]: value,
      };

      return newVariacoes;
    });
  };

  //adiciona nova variação na listagem
  const addVariacao = () => {
    setVariacoesData((prev) => [
      ...prev,
      {
        sku: "",
        variacao_id: "",
        variacao_preco: "0",
      },
    ]);
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
        preco={preco}
        setPreco={setPreco}
        setTipoProduto={setTipoProduto}
      />
      <ProdutoFormVariacoes
        addVariacao={addVariacao}
        handleChange={handleChange}
        setPrecoBase={setPrecoBase}
        variacoes={variacoes}
        variacoesData={variacoesData}
        setTipoProduto={setTipoProduto}
        tipoProduto={tipoProduto}
      />
      <ProdutoFormSubmit isEditMode={isEditMode} isPending={isPending} />

      <input
        type="hidden"
        name="empresaIds"
        value={JSON.stringify(user?.empresas.map((e) => e.empresa.id))}
      />

      <input type="hidden" name="default_variacao_id" value={""} />
    </Form.Root>
  );
}
