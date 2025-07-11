"use client";
import React, { useState } from "react";
import PrimaryTitle from "../../UI/PrimaryTitle";
import MotoristaLista from "../MotoristaLista/MotoristaLista";
import MotoristaForm from "../MotoristaForm/MotoristaForm";
import MotoristaAcoes from "../MotoristaAcoes/MotoristaAcoes";
import { MotoristaBase } from "@/src/types/motorista/motoristaType";
import { motion } from "framer-motion";

export type MotoristaProps = {
  motoristas: MotoristaBase[];
};
export default function MotoristaContainer({ motoristas }: MotoristaProps) {
  const [openModalMotorista, setOpenModalMotorista] = useState<boolean>(false);
  const [motoristaEdit, setMotoristaEdit] = useState<MotoristaBase>();
  const [openModalEdit, setModalEdit] = useState<boolean>(false);
  const motionProps = {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  }
const motoristaAtivo = motoristas.filter((motorista)=> motorista.deletado === false)   
  return (
    <section className="">
      <div className="flex items-center gap-4 container-global m-4 ">
        <PrimaryTitle title="Motoristas" />
      </div>
      <motion.div
           key="lista"
        variants={motionProps.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
      className="m-4 bg-white flex min-h-[100vh] flex-col gap-6 p-6 rounded-xl container-global shadow-md overflow- ">
        <MotoristaLista
          motoristas={motoristaAtivo}
          setOpenModalMotorista={setOpenModalMotorista}
          setMotoristaEdit={setMotoristaEdit}
          setModalEdit={setModalEdit}
        />
      </motion.div>
 {openModalMotorista && (
        <motion.div
           key="formulario"
        variants={motionProps.containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ when: "beforeChildren", staggerChildren: 0.2 }}
        className=" flex backdrop-blur-xs absolute bg-black/70  -top-22  h-[150vh] w-full justify-center items-start pt-25 z-999">
          <MotoristaForm
            setOpenModalMotorista={setOpenModalMotorista}
          />
        </motion.div>
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

