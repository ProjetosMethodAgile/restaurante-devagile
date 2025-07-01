import React from "react";
import { useStep } from "./StepContext";

export default function StepPedido() {
  const { currentStep, setCurrentStep } = useStep();
  const steps = ["Cliente", "Produto", "Concluído"];

  function changeStep(i: number) {
    currentStep >= i && setCurrentStep(i);
  }
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center mb-4 ">
      {steps.map((label, i) => {
        const active = i <= currentStep;
        const completed = i < currentStep;
        return (
          <React.Fragment key={i}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                active
                  ? "bg-primary text-white cursor-pointer hover:scale-110 transition-all duration-200 "
                  : "bg-gray-200 text-gray-600 cursor-default"
              }`}
              onClick={() => changeStep(i)}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px ${
                  completed ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
