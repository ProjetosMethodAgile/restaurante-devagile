import { Form } from "@/src/components/Form";
import iconsMap from "@/src/utils/iconsMap";
import Image from "next/image";
import React from "react";

interface HandleOpenResetPasswordProps {
  setResetSenha: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandleOpenResetPassword({
  setResetSenha,
}: HandleOpenResetPasswordProps) {

  const Voltar = iconsMap["voltar"];
  const Check = iconsMap["Check"];

  return (
    <Form.Root className="flex flex-col  w-full max-w-md p-4 bg-white rounded-lg shadow-md">

        <div className="flex justify-between ">

      <div className="flex flex-col">

        <button
          type="button"
          onClick={() => setResetSenha(false)}
          className="active:scale-101 duration-150 mb-4 w-fit "
          >
          <Voltar />
        </button>
        <label
          className="text-shadow-text-primary"
          htmlFor="email"
          >
          Digite seu email cadastrado
        </label>
      </div>
        <div className="relative bg-primary rounded-full flex items-center size-10 justify-center self-center mb-6">
                  <Image
                    src="/image/logoBranco.svg"
                    alt="Logo"
                    className="text-bg-light"
                    width={25}
                    height={20}
                    />
                  <div className="bg-success size-4 absolute rounded-full -bottom-1 -right-1 text-bg-light flex items-center justify-center">
                    <Check />
                  </div>
                </div>
                </div>
        

      <Form.InputALL
        id="email"
        type="email"
        placeholder="Digite seu Email de recuperação"
        className="w-full px-3 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base" required
      />

      <Form.InputALL
    
        type="submit"
        value="Enviar"
        className="size-full  px-3 py-2 rounded-lg text-fuchsia-50 bg-primary  focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
      />
    </Form.Root>
  );
}
