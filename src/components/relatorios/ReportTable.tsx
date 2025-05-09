import React from "react";

type ReportRow = { id: string; cliente: string; valor: number; data: string };
type ReportTableProps = { data: ReportRow[] };

export default function ReportTable({ data }: ReportTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Valor (R$)</th>
            <th className="px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.cliente}</td>
              <td className="px-4 py-2">{row.valor.toFixed(2)}</td>
              <td className="px-4 py-2">{row.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
