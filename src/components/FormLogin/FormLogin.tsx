"use client";

import Image from "next/image";
import { Form } from "../Form";
import { Check, Eye } from "lucide-react";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import React from "react";
import PrimaryButton from "@/src/utils/UI/PrimaryButton";

export default function FormLogin() {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [resetSenha, setResetSenha] = React.useState(false);
  return (
    <Form.Root
      className=" rounded-xl w-full bg-white flex flex-col p-15 shadow-lg max-w-md"
      action=""
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
        required
        id="usuario"
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
        placeholder="Digite sua senha"
        value={senha}
        required
        onChange={(e) => setSenha(e.target.value)}
      ></Form.InputText>

      <PrimaryButton text="Entrar" />

      <p
        className="text-text-secondary text-sm mt-4 cursor-pointer hover:underline"
        onClick={() => {
          setResetSenha(true);
        }}
      >
        Esqueci a senha
      </p>
    </Form.Root>
  );
}
