"use client"
import React, { useState } from "react";
import MotoristaForm from "../MotoristaForm/MotoristaForm";
import MotoristaLista from "../MotoristaLista/MotoristaLista";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
export type MotoristaProps = {
  motoristas: MotoristaBase[];
};

export default function MotoristaContainer({motoristas}:MotoristaProps) {
  const [dataAlteraMotorista, setAlteraMotorista] = useState("");
   const [edita,setEdita]=React.useState<boolean>(false)
  return (
    <section className="flex  gap-4 p-4 max-w-screen-xl mx-auto">
      <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvhs ">
        <MotoristaLista motoristas={motoristas}  setAlteraMotorista={setAlteraMotorista} setEdita={setEdita} />
      </section>
      <section className="w-full md:w-1/2 lg:w-2/4 bg-white rounded-lg shadow p-4">
        <MotoristaForm motoristas={motoristas}  dataAlteraMotorista={dataAlteraMotorista} setAlteraMotorista={setAlteraMotorista} setEdita={setEdita}  />
      </section>
    </section>
  );
}
