"use client";

import React from "react";
import { UsuarioTelas } from "@/src/types/user/userType";

type IUserContext = {
  user: UsuarioTelas | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioTelas | null>>;
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
}: {
  children: React.ReactNode;
  user: UsuarioTelas | null;
}) {
  const [userState, setUser] = React.useState<UsuarioTelas | null>(user);

  return (
    <UserContext.Provider
      value={{
        user: userState,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
