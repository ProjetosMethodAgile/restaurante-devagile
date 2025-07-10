"use client";
import { ClienteBase } from "@/src/types/cliente/clientType";
import React, { createContext, useContext, useState, ReactNode } from "react";

type StepContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  currentClient: ClienteBase | null;
  setCurrentClient: React.Dispatch<React.SetStateAction<ClienteBase | null>>;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export function useStep() {
  const ctx = useContext(StepContext);
  if (!ctx)
    throw new Error("useStep só pode ser usado dentro de <StepProvider>");
  return ctx;
}

export function StepProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentClient, setCurrentClient] = useState<ClienteBase | null>(null);

  return (
    <StepContext.Provider
      value={{ currentStep, setCurrentStep, currentClient, setCurrentClient }}
    >
      {children}
    </StepContext.Provider>
  );
}
