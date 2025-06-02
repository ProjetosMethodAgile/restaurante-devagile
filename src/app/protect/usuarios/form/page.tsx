"use client";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import SecondaryTitle from "@/src/components/UI/SecondaryTitle";
import UsuarioForm from "@/src/components/Usuarios/UsuarioForm/UsuarioForm";
import { Check } from "lucide-react";
import { useActionState } from "react";

export default async function UsuarioFormPage() {
  return (
    <section className="m-4 bg-white flex flex-col gap-6 p-6 rounded-xl shadow-md">
      <PrimaryTitle title="Cadastro de usuario" />
      <UsuarioForm />
    </section>
  );
}
