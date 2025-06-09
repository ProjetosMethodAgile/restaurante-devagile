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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // filtra das telas pai e ordena conforme o codigo
  const userTelas = user.telas
    .filter((tela) => tela.tela.tela_parent_id === null)
    .sort((a, b) => String(b.tela.codigo).localeCompare(a.tela.codigo));

  function handleToggle(menu: string) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(null);
      setMobileMenuOpen(false);
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
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <BookOpen className="bg-primary p-2 text-white rounded-full size-10" />
          <h1 className="font-semibold text-2xl text-slate-900 whitespace-nowrap">
            Bikeline {empresa && ` - ${empresa.razao_social}`}
          </h1>
        </div>

        {/* Botão hamburger para mobile */}
        <button
          className="md:hidden flex items-center text-primary focus:outline-none"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              // Ícone "X"
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Ícone hamburger
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Menu - desktop e mobile */}
        <div
          className={`
            w-full md:w-auto
            md:flex md:items-center md:gap-10
            ${mobileMenuOpen ? "block" : "hidden"}
            md:block
          `}
        >
          <ul className="flex flex-col md:flex-row md:flex-row-reverse md:flex-wrap gap-6 items-start md:items-center relative">
            {empresa &&
              userTelas.map((tela) => (
                <li key={tela.tela.id} className="relative w-full md:w-auto">
                  {tela.tela.subtelas && tela.tela.subtelas.length > 0 ? (
                    <>
                      <div
                        className="flex items-center gap-1 cursor-pointer hover:text-primary justify-between px-4 py-2 md:p-0"
                        onClick={() => handleToggle(tela.tela.codigo)}
                      >
                        <span>{tela.tela.nome}</span>
                        <ChevronDown size={16} className="md:hidden" />
                      </div>

                      {/* Submenu */}
                      {(openMenu === tela.tela.codigo || mobileMenuOpen) && (
                        <ul
                          className={`
                            md:absolute md:top-full md:left-0 md:mt-[2px] md:bg-white md:border md:rounded-md md:w-64 md:z-50 md:shadow-sm md:border-t-4 md:border-primary
                            ${mobileMenuOpen ? "pl-4" : ""}
                          `}
                        >
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
                                  onClick={() => {
                                    // fecha menu mobile ao clicar
                                    setMobileMenuOpen(false);
                                    setOpenMenu(null);
                                  }}
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
                      className="cursor-pointer hover:text-primary block px-4 py-2 md:p-0"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {tela.tela.nome}
                    </Link>
                  )}
                </li>
              ))}
          </ul>

          {/* User info e logout */}
          <div className="flex items-center gap-4 mt-4 md:mt-0 px-4 md:px-0 border-t border-gray-200 md:border-0 pt-4 md:pt-0">
            <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10" />
            <h3>{user.nome.split(" ")[0] ?? "Usuário"}</h3>
            <span>|</span>
            <button
              className="cursor-pointer hover:text-primary text-left"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
