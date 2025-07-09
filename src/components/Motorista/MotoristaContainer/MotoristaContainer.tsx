"use client";
import React, { useState } from "react";
import PrimaryTitle from "../../UI/PrimaryTitle";
import MotoristaLista from "../MotoristaLista/MotoristaLista";
import MotoristaForm from "../MotoristaForm/MotoristaForm";
import MotoristaAcoes from "../MotoristaAcoes/MotoristaAcoes";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
export type MotoristaProps = {
  motoristas: MotoristaBase[];
};


export default function MotoristaContainer({ motoristas }: MotoristaProps) {
  const [openModalMotorista, setOpenModalMotorista] = useState<boolean>(false);
  const [motoristaEdit, setMotoristaEdit] = useState<MotoristaBase>();
  const [openModalEdit, setModalEdit] = useState<boolean>(false);

const motoristaAtivo = motoristas.filter((motorista)=> motorista.deletado === false)   
  return (
    <section className="">
      <div className="flex items-center gap-4 container-global m-4 ">
        <PrimaryTitle title="Motoristas" />
      </div>
      <div className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md overflow- ">
        <MotoristaLista
          motoristas={motoristaAtivo}
          setOpenModalMotorista={setOpenModalMotorista}
          setMotoristaEdit={setMotoristaEdit}
          setModalEdit={setModalEdit}
        />
      </div>
 {openModalMotorista && (
        <div className=" flex backdrop-blur-xs absolute bg-black/70  -top-22  h-[150vh] w-full justify-center items-start pt-25 z-999">
          <MotoristaForm
            setOpenModalMotorista={setOpenModalMotorista}
          />
        </div>
      )}

    { openModalEdit && (
        <div className="flex backdrop-blur-xs absolute bg-black/70  -top-22  h-[150vh] w-full justify-center items-start pt-25 z-999">
          <MotoristaAcoes
            motorista={motoristaEdit}
            setModalEdit={setModalEdit}
          />
        </div>
      )}
      
    </section>
  );
}

{
  /* <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvhs ">
  <MotoristaLista motoristas={motoristas}  setAlteraMotorista={setAlteraMotorista} setEdita={setEdita} />
</section>
<section className="w-full md:w-1/2 lg:w-2/4 bg-white rounded-lg shadow p-4">
  <MotoristaForm motoristas={motoristas}  dataAlteraMotorista={dataAlteraMotorista} setAlteraMotorista={setAlteraMotorista} setEdita={setEdita}  />
</section> */
}
