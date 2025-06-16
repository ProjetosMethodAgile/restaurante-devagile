"use client";

import React from "react";
import { Form } from "../../UI/Form";
import PrimaryButton from "../../UI/PrimaryButton";
import { Check } from "lucide-react";

export default function RedefinirSenhaForm() {
  const [isPending, startTransition] = React.useTransition();
  return (
    <Form.Root className="flex flex-col gap-4">
      <Form.InputText label="Insira a nova senha" />
      <Form.InputText label="Confirme a senha" />
      <PrimaryButton
        text={isPending ? "Gravando..." : "Gravar"}
        className="bg-secondary rounded-xl hover:bg-secondary/90"
        icon={Check}
        type="submit"
        disabled={isPending}
      />
    </Form.Root>
  );
}
