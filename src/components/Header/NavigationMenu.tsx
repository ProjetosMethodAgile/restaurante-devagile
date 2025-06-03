// /src/components/Header/NavigationMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, User2 } from "lucide-react";
import logoff from "@/src/actions/auth/logoff";
import { UsuarioTelas } from "@/src/types/user/userType";
import { CurrentEmpresaProps } from "@/src/context/userContext";

type NavigationMenuProps = {
  user: UsuarioTelas;
  empresa: CurrentEmpresaProps | null;
};

export default function NavigationMenu({ user, empresa }: NavigationMenuProps) {
  async function handleLogout() {
    await logoff();
    // clearEmpresa() apaga o cookie e redireciona para /select-empresa
  }

  return (
    <header className="bg-white w-full shadow-md">
      <nav className="flex justify-between items-center px-6 py-4 container-global">
        <div className="flex items-center gap-2">
          <BookOpen className="bg-primary p-2 text-card rounded-full size-10" />
          <h1 className="font-semibold text-2xl text-slate-900">
            Bikeline {empresa && " - " + empresa.razao_social}
          </h1>
        </div>

        <nav className="flex items-center gap-10 text-text-secondary">
          <ul className="flex gap-6">
            {empresa && (
              <div className="flex gap-6">
                <li className="cursor-pointer hover:text-primary font-semibold">
                  <Link href="/protect/home">Início</Link>
                </li>
                <li className="cursor-pointer hover:text-primary font-semibold">
                  <Link href="/protect/cliente">Clientes</Link>
                </li>
                <li className="cursor-pointer hover:text-primary font-semibold">
                  <Link href="/protect/relatorios">Relatórios</Link>
                </li>
              </div>
            )}
            <li
              className="cursor-pointer hover:text-primary font-semibold"
              onClick={handleLogout}
            >
              Sair
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <h3>{user.nome ?? "Usuário"}</h3>
            <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10" />
          </div>
        </nav>
      </nav>
    </header>
  );
}
