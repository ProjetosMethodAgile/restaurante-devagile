"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, User2, ChevronDown } from "lucide-react";
import logoff from "@/src/actions/auth/logoff";
import { UsuarioTelas } from "@/src/types/user/userType";
import { CurrentEmpresaProps } from "@/src/context/userContext";

type NavigationMenuProps = {
  user: UsuarioTelas;
  empresa: CurrentEmpresaProps | null;
};

export default function NavigationMenu({ user, empresa }: NavigationMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleToggle(menu: string) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(null);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    await logoff();
  }

  return (
    <header className="bg-white shadow-md w-full z-50 relative">
      <nav
        ref={menuRef}
        className="flex justify-between items-center px-6 py-4 flex-wrap container-global"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="bg-primary p-2 text-white rounded-full size-10" />
          <h1 className="font-semibold text-2xl text-slate-900">
            Bikeline {empresa && ` - ${empresa.razao_social}`}
          </h1>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-700 flex-wrap font-medium">
          <ul className="flex flex-wrap gap-6 items-center relative">
            {empresa && (
              <>
                <li
                  onClick={() => setOpenMenu(null)}
                  className={`cursor-pointer hover:text-primary ${
                    openMenu === null && "text-primary font-semibold"
                  }`}
                >
                  <Link href="/app/home">Início</Link>
                </li>

                <li className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-primary"
                    onClick={() => handleToggle("cadastro")}
                  >
                    Cadastro <ChevronDown size={16} />
                  </div>
                  {openMenu === "cadastro" && (
                    <ul className="absolute top-full left-0 mt-[2px] bg-white border   rounded-md w-56 z-50 shadow-sm border-t-4 border-primary">
                      <li>
                        <Link
                          href="/app/cliente"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Clientes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/produto"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Produtos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/motorista"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Motoristas
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-primary"
                    onClick={() => handleToggle("config")}
                  >
                    Configurações <ChevronDown size={16} />
                  </div>
                  {openMenu === "config" && (
                    <ul className="absolute top-full left-0 mt-[2px] bg-white border  rounded-md w-64 z-50 shadow-sm border-t-4 border-primary">
                      <li>
                        <Link
                          href="/app/usuarios"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Usuários do Sistema
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/parametros"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Parâmetros
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/app/empresa"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Empresa
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/select-empresa"
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          Trocar de empresa
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
            <li
              className="cursor-pointer hover:text-primary"
              onClick={handleLogout}
            >
              Sair
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <h3>{user.nome.split(" ")[0] ?? "Usuário"}</h3>
            <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10" />
          </div>
        </div>
      </nav>
    </header>
  );
}
