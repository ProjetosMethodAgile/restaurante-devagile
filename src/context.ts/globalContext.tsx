"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Alias genérico para qualquer setter de useState
type SetState<T> = Dispatch<SetStateAction<T>>;

export interface IGlobalContext {
  usuario: string;
  setUsuario: SetState<string>;
  senha: string;
  setSenha: SetState<string>;
  nomeEmpresa: string;
  setNomeEmpresa: SetState<string>;
  openGlobalModal: (content: React.ReactNode) => void;
  closeGlobalModal: () => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const useGlobalContext = (): IGlobalContext => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return ctx;
};
export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [nomeEmpresa, setNomeEmpresa] = useState("Restaurante do Português");
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const [globalModalContent, setGlobalModalContent] =
    useState<React.ReactNode | null>(null);
  const openGlobalModal = (content: React.ReactNode) => {
    setGlobalModalContent(content);
  };
  const closeGlobalModal = () => {
    setGlobalModalContent(null);
  };
  console.log(globalModalContent);
  

  const contextValue: IGlobalContext = {
    usuario,
    setUsuario,
    senha,
    setSenha,
    nomeEmpresa,
    setNomeEmpresa,
    openGlobalModal,
    closeGlobalModal,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalContext.Provider>
  );
};
