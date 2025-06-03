"use client";

import Image from "next/image";

import { Check, Eye } from "lucide-react";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import React, { useActionState } from "react";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import { Form } from "@/src/components/UI/Form";
import { login } from "@/src/actions/auth/login";

export default function FormLogin() {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  // const [resetSenha, setResetSenha] = React.useState(false);

  const [result, loginAction, pending] = useActionState(login, {
    success: true,
  });

  return (
    <Form.Root
      className="flex gap-2 rounded-xl w-full bg-white flex-col p-15 shadow-lg max-w-md"
      action={loginAction}
    >
      <div className="relative bg-primary rounded-full flex items-center size-20 justify-center self-center mb-6">
        <Image
          src="/image/logoBranco.svg"
          alt="Logo"
          className="text-bg-light"
          width={50}
          height={50}
        />
        <div className="bg-success size-8 absolute rounded-full -bottom-2 -right-2 text-bg-light flex items-center justify-center">
          <Check />
        </div>
      </div>

      <PrimaryTitle title="Restaurante" />
      <Form.InputText
        id="usuario"
        name="email"
        label="usuario"
        placeholder="Digite seu usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <Form.InputText
        id="senha"
        label="senha"
        type={"password"}
        icon={Eye}
        iconPosition="right"
        name="senha"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <PrimaryButton
        text={pending ? "entrando..." : "Entrar"}
        className=""
        disabled={pending ? true : false}
      />
      {!result.success && (
        <p className="mt-2 text-sm text-red-600">{result.message}</p>
      )}
      <p
        className="text-text-secondary text-sm mt-2 cursor-pointer hover:underline"
        onClick={() => {
          // setResetSenha(true);
        }}
      >
        Esqueci a senha
      </p>
    </Form.Root>
  );
}
