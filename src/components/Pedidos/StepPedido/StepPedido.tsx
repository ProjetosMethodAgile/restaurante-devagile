import React from "react";

export type StepPedidoProps = React.ComponentProps<"div"> & {
  currentStep: number;
};

export default function StepPedido({ currentStep }: StepPedidoProps) {
  const steps = ["Cliente", "Produto", "Concluído"];

  return (
    <div className="flex flex-wrap gap-10 items-center mb-4 lg:w-125">
      {steps.map((label, i) => {
        const active = i <= currentStep;
        const completed = i < currentStep;
        return (
          <React.Fragment key={i}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                active ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
              }`}
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
