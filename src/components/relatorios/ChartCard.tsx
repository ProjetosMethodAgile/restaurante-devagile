import React, { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex-1">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children}
    </div>
  );
}
