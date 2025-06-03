"use client";

import PrimaryTitle from "@/src/components/UI/PrimaryTitle";

export default async function UsuarioFormPage() {
  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <UsuarioFormPage />
    </section>
  );
}
