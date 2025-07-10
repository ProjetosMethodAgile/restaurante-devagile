import { Check, LoaderCircle } from "lucide-react";
import PrimaryButton from "../../UI/PrimaryButton";

type ProdutoFormSubmitProps = {
  isPending: boolean;
  isEditMode: boolean;
};

export function ProdutoFormSubmit({
  isEditMode,
  isPending,
}: ProdutoFormSubmitProps) {
  return (
    <div className="flex justify-end mt-4">
      <PrimaryButton
        text={
          isPending ? "Salvando..." : isEditMode ? "Atualizar" : "Cadastrar"
        }
        className="bg-secondary rounded-xl hover:bg-secondary/90"
        icon={isPending ? LoaderCircle : Check}
        type="submit"
        disabled={isPending}
        isPending={isPending}
      />
    </div>
  );
}
