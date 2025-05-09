"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type MonthlyChartProps = {
  data: { name: string; pedidos: number }[];
};

export default function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pedidos"
          stroke="#7D2AE8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
