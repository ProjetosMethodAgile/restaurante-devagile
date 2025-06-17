import React from "react";
import MotoristaForm from "../MotoristaForm/MotoristaForm";
import MotoristaLista from "../MotoristaLista/MotoristaLista";

export default function MotoristaContainer() {
  return (
    <section className="flex  gap-4 p-4 max-w-screen-xl mx-auto">
      <section className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow p-4 h-dvhs ">
        <MotoristaLista />
      </section>
      <section className="w-full md:w-1/2 lg:w-2/4 bg-white rounded-lg shadow p-4">
        <MotoristaForm />
      </section>
    </section>
  );
}
