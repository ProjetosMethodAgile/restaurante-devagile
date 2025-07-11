// src/app/relatorios/page.tsx

import ChartsWrapper from "@/src/components/Relatorios/ChartsWrapper";
import ReportTable from "@/src/components/Relatorios/ReportTable";


export default function ReportsPage() {
  const pedidosData = [
    { name: "Jan", pedidos: 30 },
    { name: "Fev", pedidos: 45 },
    { name: "Mar", pedidos: 28 },
    { name: "Abr", pedidos: 60 },
  ];

  const financeiroData = [
    { name: "Jan", valor: 12000 },
    { name: "Fev", valor: 15000 },
    { name: "Mar", valor: 8000 },
    { name: "Abr", valor: 18000 },
  ];

  const tableData = [
    { id: "001", cliente: "Empresa A", valor: 1200, data: "2025-05-01" },
    { id: "002", cliente: "Empresa B", valor: 850, data: "2025-05-03" },
    { id: "003", cliente: "Empresa C", valor: 640, data: "2025-05-04" },
    { id: "004", cliente: "Empresa D", valor: 2300, data: "2025-05-06" },
  ];

  return (
    <div className="container-global flex-1 flex flex-col overflow-auto">
      <main className="p-6 space-y-8 flex-1">
        {/* Dashboards */}
        <ChartsWrapper
          pedidosData={pedidosData}
          financeiroData={financeiroData}
        />

        {/* Tabela de Detalhamento */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Detalhamento de Pedidos Emitidos
          </h2>
          <ReportTable data={tableData} />
        </section>
      </main>
    </div>
  );
}
