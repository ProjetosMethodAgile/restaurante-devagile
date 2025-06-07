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

  // filtra das telas pai e ordena conforme o codigo
  const userTelas = user.telas.filter(
    (tela) => tela.tela.tela_parent_id === null
  ).sort((a,b)=> String(b.tela.codigo).localeCompare(a.tela.codigo));

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

        <div className="flex items-center gap-10 text-sm text-gray-700 flex-wrap font-medium">
          <ul className="flex flex-row-reverse flex-wrap gap-6 items-center relative">
            {empresa && (
              <>
                {userTelas.map((tela) => (
                  <li key={tela.tela.id} className="relative">
                    {tela.tela.subtelas && tela.tela.subtelas.length > 0 ? (
                      <>
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-primary"
                          onClick={() => handleToggle(tela.tela.codigo)}
                        >
                          {tela.tela.nome} <ChevronDown size={16} />
                        </div>
                        {openMenu === tela.tela.codigo && (
                          <ul className="absolute top-full left-0 mt-[2px] bg-white border rounded-md w-64 z-50 shadow-sm border-t-4 border-primary">
                            {tela.tela.subtelas.map((sub) => {
                              const telaLiberada = user.telas.some(
                                (allTela) => allTela.tela.id === sub.id
                              );

                              if (!telaLiberada) return null;
                              return (
                                <li key={sub.id}>
                                  <Link
                                    href={sub.href}
                                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                  >
                                    {sub.nome}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={tela.tela.href}
                        className="cursor-pointer hover:text-primary block"
                      >
                        {tela.tela.nome}
                      </Link>
                    )}
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className="flex items-center gap-4">
            <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10" />
            <h3>{user.nome.split(" ")[0] ?? "Usuário"}</h3>
            |
            <li
              className="cursor-pointer list-none hover:text-primary"
              onClick={handleLogout}
            >
              Sair
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
}
