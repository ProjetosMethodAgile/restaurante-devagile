"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type StepContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
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
  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
}
