"use client";
import Image from "next/image";
import { Form } from "../components/Form";
import { useState } from "react";

import iconsMap from "../utils/iconsMap";
export default function Logi() {
  const [nomeEmpresa, setNomeEmpresa] = useState("Restaurante do Português");
   const Check = iconsMap["Check"]
  return (
    <div className="flex items-center justify-center min-h-screen bg-light w-full">
      <Form.Root className="bg-white flex flex-col p-15 rounded-xl shadow-lg max-w-md ">
        <div className="relative bg-primary rounded-full flex items-center size-20 justify-center self-center mb-6">
           <Image src="/image/logoBranco.svg" alt="Logo" className="text-bg-light" width={50} height={50} />
           <div className="bg-success size-8 absolute rounded-full -bottom-2 -right-2 text-bg-light flex items-center justify-center">
                <Check/>
           </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-6 w-full">
          {nomeEmpresa}
        </h2>
        <label htmlFor="usuario" className="block text-text-secondary text-sm font-medium mb-2">Senha</label>
        <Form.InputALL id="usuario"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-prim focus:border-transparent"
          placeholder="Digite seu usuário"
        />
        <label htmlFor="senha" className="block text-text-secondary text-sm font-medium  mt-2 mb-2">Senha</label>
        <Form.InputALL id="senha" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Digite sua senha" />
        <Form.ButtonChange className="w-full  bg-primary text-card py-2 px-4 rounded-lg hover:bg-primary transition duration-300 mt-4"  > Entrar</Form.ButtonChange>
         <p className="text-text-secondary text-sm mt-4">Esqueci a senha</p> 
      </Form.Root>
    </div>
  );
}
