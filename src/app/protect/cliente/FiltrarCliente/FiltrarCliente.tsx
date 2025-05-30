'use client'
import { Form } from "@/src/components/UI/Form";
import { useState } from "react";
import { Search } from 'lucide-react';
export type FiltrarPageProps = React.ComponentProps<'div'> & {
  clientes: Cliente[];
};

type Cliente = {
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  CEP: string;
  telefone: string;
  frete: string;
};

export default function FiltrarClientes({
  clientes,
}: FiltrarPageProps) {

const [search, setSearch] = useState("");
 const term = search.toLowerCase().trim();
  const digits = search.replace(/\D/g, "");
  const filteredClientes = clientes.filter((item) => {
    const name = item.nome.toLowerCase();
    const address = `${item.logradouro} ${item.numero}`.toLowerCase();
    const cepDigits = item.CEP.replace(/\D/g, "");
    const phoneDigits = item.telefone.replace(/\D/g, "");

    const textMatch = term && (name.includes(term) || address.includes(term));
    const cepMatch = digits && cepDigits.includes(digits);
    const phoneMatch = digits && phoneDigits.includes(digits);

    return search === "" || textMatch || cepMatch || phoneMatch;
  });

  return (
    <section className="gap-3 flex flex-col">
         <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2D5C] mb-4">
          Lista de clientes
        </h2>
        <p className="text-text-primary">
          {" "}
          Clientes cadastrados: {filteredClientes.length}
        </p>
        <Form.InputText
          type="text"
          placeholder="Buscar cliente por nome, rua, CEP ou telefone"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
      <ul>
        
        {filteredClientes.map((item, idx) => (
          <li key={idx} className="bg-white rounded border border-gray-200 mb-2">
            <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t">
              <div className="flex items-baseline space-x-2">
                <span className="font-medium text-gray-800">{item.nome}</span>
                <span className="text-sm text-gray-600">{item.telefone}</span>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  Excluir
                </button>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              <p className="text-sm text-gray-700">
                {`${item.logradouro}, ${item.numero} - ${item.bairro}`}
              </p>
              <p className="text-sm text-gray-700">CEP: {item.CEP}</p>
              <p className="text-sm text-gray-700">Frete: R$ {item.frete}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
