"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type FinancialChartProps = {
  data: { name: string; valor: number }[];
};

export default function FinancialChart({ data }: FinancialChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#00C4CC"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
