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

type ProdutoFormType = {
  categorias: CategoriaBase[] | [];
  variacoes: VariacaoBase[] | [];
};

type VariacaoState = {
  sku: string;
  variacaoId: string;
  preco_variacao: string;
};

export default function ProdutoForm({
  categorias,
  variacoes,
}: ProdutoFormType) {
  const [isPending, startTransition] = useTransition();
  const [variacoesData, setVariacoesData] = useState<VariacaoState[] | []>([
    {
      preco_variacao: "",
      sku: "",
      variacaoId: "",
    },
  ]);
 const [preco, setPreco] = useState<string>("");
  const [activeVariacoes, setActiveVariacoes] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const isEditMode = true;
  const [state, formAction] = useActionState(postProduto, {
    errors: [],
    msg_success: "",
    success: false,
  });

  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((erro: string) => toast.error(erro));
    }

    if (state?.success) {
      toast.success(state.msg_success);

      startTransition(() => {
        router.push("/app/usuarios");
      });
    }
  }, [state.success, state.errors, state.msg_success, router]);

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

  const addVariacao = () => {
    setVariacoesData((prev) => [
      ...prev,
      {
        sku: "",
        variacaoId: "",
        preco_variacao: "0",
      },
    ]);
  };

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

  const ativaVariacoes = (checked: boolean) => {
    if (checked) setActiveVariacoes(true);
    else setActiveVariacoes(false)
  };

  return (
    <Form.Root action={formAction}>
      <div className="border-b border-slate-200 py-4">
        <SecondaryTitle title="Informações Basicas" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
          <Form.InputText
            label="SKU"
            name="codigo"
            type="text"
            placeholder="PRATO-001"
          />

          <Form.InputText
            label="Nome do Produto"
            type="text"
            placeholder="Feijoada Completa"
            name="nome"
          />

          <Form.InputText
            label="Preço Base"
            type="text"
            placeholder="R$"
            name="precoBase"
            value={preco}
           onChange={(e) => setPreco(e.target.value)}
          />
          <Form.InputOptions
            label="Categoria"
            name="categoria"
            options={categorias.map((categoria) => {
              return { label: categoria.nome, value: categoria.id };
            })}
          />
          <Form.InputText
            label="Descrição"
            type="text"
            placeholder="Feijoada, Arroz, Batata..."
            name="descricao"
          />
        </div>
      </div>

      <div className="border-b border-slate-200 py-4">
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="incluir_variacoes"
              id="incluir_variacoes"
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                ativaVariacoes((e.target as HTMLInputElement).checked)
              }
            />
            <label htmlFor="incluir_variacoes">Incluir variações</label>
          </div>
          {activeVariacoes && (
            <ul className="flex flex-col shadow-sm gap-4 bg-gray-100 p-4 rounded-xl">
              <li className="flex justify-between">
                <SecondaryTitle title="Variações" />
                <div>
                  {variacoesData.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="checkbox"
                        name="incluir_preco_base"
                        id="incluir_preco_base"
                        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                          setPrecoBase((e.target as HTMLInputElement).checked)
                        }
                      />
                      <label htmlFor="incluir_preco_base">
                        Utilizar preço base
                      </label>
                    </div>
                  )}
                </div>
              </li>
              {variacoesData.map((variacao, idx) => {
                return (
                  <li className="grid grid-cols-[auto_1fr_1fr_1fr_auto] border-b-2 border-gray-200/80 pb-4 items-center gap-4 bg-gray-100 ">
                    <span className="text-slate-700 text-sm "># {idx + 1}</span>
                    <Form.InputText
                      label="SKU"
                      name="sku"
                      type="text"
                      value={variacao.sku}
                      placeholder="PRATO-001"
                      className="bg-white"
                      onChange={(e) => handleChange(idx, e.target)}
                    />
                    <Form.InputOptions
                      label="Variação"
                      options={variacoes.map((variacao) => {
                        return { label: variacao.nome, value: variacao.id };
                      })}
                      className="bg-white"
                      value={variacao.variacaoId}
                      onChange={(e) => handleChange(idx, e.target)}
                      name="variacaoId"
                    />
                    <Form.InputText
                      label="Preço"
                      type="text"
                      placeholder="R$"
                      name="preco_variacao"
                      className="bg-white"
                      value={variacao.preco_variacao}
                      onChange={(e) => handleChange(idx, e.target)}
                    />
                    <Trash2Icon className="mt-4 cursor-pointer hover:scale-102 transition-all text-primary" />
                  </li>
                );
              })}
              <li
                onClick={addVariacao}
                className="bg-secondary gap-2 items-center flex cursor-pointer hover:scale-102 transition-all rounded-xl mx-auto p-2 text-white mt-2"
              >
                <span>Adicionar Variação</span>
                <Plus />
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <PrimaryButton
          text={
            isPending ? "Salvando..." : !isEditMode ? "Atualizar" : "Cadastrar"
          }
          className="bg-secondary rounded-xl hover:bg-secondary/90"
          icon={isPending ? LoaderCircle : Check}
          type="submit"
          disabled={isPending}
          isPending={isPending}
        />
      </div>

      <input
        type="hidden"
        name="empresaIds"
        value={JSON.stringify(user?.empresas.map((e) => e.empresa.id))}
      />
    </Form.Root>
  );
}
