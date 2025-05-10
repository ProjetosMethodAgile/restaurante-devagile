// src/app/logi/page.tsx
"use client";
import Image from "next/image";
import { Form } from "../components/Form";
import { useState } from "react";
import iconsMap from "../utils/iconsMap";
import { verifyInputLogin } from "./../utils/genericFunction/validaInput";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context.ts/globalContext";

type ValidationState = {
  validaUsuario: boolean;
  validasenha: boolean;
};

export default function Logi() {
  const { usuario, setUsuario, senha, setSenha, nomeEmpresa } =
    useGlobalContext();
  const [typeSenha, setTypeSenha] = useState(true);


  const [returnValidate, setReturnValidate] = useState<ValidationState>({
    validaUsuario: false,
    validasenha: false,
  });
  const Check = iconsMap["Check"];
  const IconSenhaVisible = iconsMap["Eye"];
  const IconSenhaNotVisible = iconsMap["EyeOff"];

  // Flag para habilitar/desabilitar o botão
  const isFormFilled = usuario.trim() !== "" && senha.trim() !== "";

  function handleSendLoginUSer(e: React.FormEvent) {
    e.preventDefault();
    const validate = verifyInputLogin(usuario, senha);
    if (validate.error) {
      const field = validate.field || "";
      toast.error(validate.message);
      animacaoborderRed(field);
    }
    // lógica de envio aqui
  }

  function animacaoborderRed(field: string) {
    if (field === "usuario") {
      setReturnValidate({ validaUsuario: true, validasenha: false });
    } else {
      setReturnValidate({ validaUsuario: false, validasenha: true });
    }
    setTimeout(() => {
      setReturnValidate({ validaUsuario: false, validasenha: false });
    }, 1000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-light w-full">
      <Form.Root
        className="bg-white flex flex-col p-15 rounded-xl shadow-lg max-w-md"
        onSubmit={handleSendLoginUSer}
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
        <h2 className="text-2xl font-bold text-center text-text-primary mb-6 w-full">
          {nomeEmpresa}
        </h2>
        <label htmlFor="usuario" className="block text-text-secondary text-sm font-medium mb-2">
          Usuário
        </label>
        <Form.InputALL
          id="usuario"
          className={`
            w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
            ${returnValidate.validaUsuario ? "blink-border" : ""}
          `}
          placeholder="Digite seu usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label htmlFor="senha" className="block text-text-secondary text-sm font-medium mt-4 mb-2">
          Senha
        </label>
        <Form.InputWithIcon
          id="senha"
          type={typeSenha ? "password" : "text"}
          className={`
            w-full  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary/70
            ${returnValidate.validasenha ? "blink-border" : ""}
          `}
          placeholder="Digite sua senha"
          value={senha}
          
          onChange={(e) => setSenha(e.target.value)}
        >
          {typeSenha ? (
            <div onClick={() => setTypeSenha(false)} className=" z-999 absolute right-2 top-2 cursor-pointer  text-text-secondary">
              <IconSenhaNotVisible />
            </div>
          ) : (
            <div onClick={() => setTypeSenha(true)} className="z-999 absolute right-2 top-2 cursor-pointer text-text-secondary">
              <IconSenhaVisible />
            </div>
          )}
        </Form.InputWithIcon>

        <Form.ButtonChange
          type="submit"
          disabled={!isFormFilled}
          className={`
            w-full py-2 px-4 rounded-lg active:scale-102 ease-out duration-75 mt-6
            ${!isFormFilled
              ? "bg-primary/10 text-card  cursor-not-allowed"
              : "bg-primary hover:bg-primary/70 text-white"}
          `}
        >
          Entrar
        </Form.ButtonChange>

        <p className="text-text-secondary text-sm mt-4 cursor-pointer hover:underline">
          Esqueci a senha
        </p>
      </Form.Root>
    </div>
  );
}
