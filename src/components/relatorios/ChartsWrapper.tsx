/* src/components/relatorios/ChartsWrapper.tsx */
"use client";

import dynamic from "next/dynamic";
import ChartCard from "./ChartCard";

// Dynamic imports dos gráficos com ssr desabilitado
const MonthlyChart = dynamic<{
  data: { name: string; pedidos: number }[];
}>(() => import("./MonthlyChart"), { ssr: false });

const FinancialChart = dynamic<{
  data: { name: string; valor: number }[];
}>(() => import("./FinancialChart"), { ssr: false });

type ChartsWrapperProps = {
  pedidosData: { name: string; pedidos: number }[];
  financeiroData: { name: string; valor: number }[];
};

export default function ChartsWrapper({
  pedidosData,
  financeiroData,
}: ChartsWrapperProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard title="Pedidos Mensais">
        <MonthlyChart data={pedidosData} />
      </ChartCard>

      <ChartCard title="Fluxo Financeiro">
        <FinancialChart data={financeiroData} />
      </ChartCard>
    </div>
  );
}
