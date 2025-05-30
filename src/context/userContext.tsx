"use client";

import React from "react";
import { UsuarioTelas } from "@/src/types/user/userType";

export type CurrentEmpresaProps = {
  id: string;
  codigo: string;
  status: string;
  razao_social: string;
  cnpj: string;
  tipoEmpresa: { nome: string };
};

type IUserContext = {
  user: UsuarioTelas | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioTelas | null>>;
  empresa?: CurrentEmpresaProps | null;
  setCurrentEmpresa: React.Dispatch<
    React.SetStateAction<CurrentEmpresaProps | null>
  >;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser deve ser usado dentro do Provider");
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
  empresa,
}: {
  children: React.ReactNode;
  user: UsuarioTelas | null;
  empresa?: CurrentEmpresaProps | null;
}) {
  const [userState, setUser] = React.useState<UsuarioTelas | null>(user);
  const [currentEmpresa, setCurrentEmpresa] =
    React.useState<CurrentEmpresaProps | null>(empresa || null);

  return (
    <UserContext.Provider
      value={{
        user: userState,
        setUser,
        empresa: currentEmpresa,
        setCurrentEmpresa,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
