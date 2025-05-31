"use client";

import React, { useEffect } from "react";
import { useUser } from "@/src/context/userContext";
import { BookOpen, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logoff from "@/src/actions/auth/logoff";

export default function NavigationMenu() {
  const { user, empresa, setCurrentEmpresa } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Enquanto user for undefined (por exemplo, contexto ainda carregando), não renderiza nada
  if (user === undefined) {
    return null;
  }

  useEffect(() => {
    // Se não há user, redireciona para tela de login/protect
    if (!user) {
      logoff();
      return;
    }

    // Se já existe empresa salva no localStorage, dispara o setCurrentEmpresa
    const empresaId = window.localStorage.getItem("empresaStorage");
    if (empresaId) {
      const encontrada = user.empresas.find(
        (emp) => emp.empresa.id === empresaId
      );
      if (encontrada) {
        setCurrentEmpresa(encontrada.empresa);
      }
    } else {
      setCurrentEmpresa(null);
      if (pathname !== "/protect/") {
        router.replace("/protect/");
      }
    }
  }, [user, router, setCurrentEmpresa, pathname]);

  if (!user) return null;

  async function handleLogout() {
    window.localStorage.removeItem("empresaStorage");
    logoff();
  }

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-bottom shadow-2xl">
      <div className="flex items-center gap-2">
        <BookOpen className="bg-primary p-2 text-card rounded-full size-10" />
        <h1 className="font-semibold text-2xl text-slate-900">Bikeline</h1>
      </div>

      <nav className="flex items-center gap-10 text-text-secondary">
        <ul className="flex gap-6">
          {empresa && (
            <div className="flex gap-6">
              <li className="cursor-pointer hover:text-primary font-semibold">
                <Link href="/protect/home">Inicio</Link>
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
            onClick={() => {
              handleLogout();
            }}
          >
            Sair
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <h3>{user.nome ?? "Usuário"}</h3>
          <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10" />
        </div>
      </nav>
    </header>
  );
}
