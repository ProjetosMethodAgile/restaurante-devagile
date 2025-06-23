import { Form } from "@/src/components/UI/Form";
import { Search } from "lucide-react";

type ClienteFiltroProps = {
  buscaCliente: (value: string) => void;
  filteredClientes: Array<{ id: string; nome: string; cpf?: string }>;
  searchList: boolean;
  carregaCliente: (clientId: string) => void;
};

export default function ClienteFiltro({
  buscaCliente,
  filteredClientes,
  searchList,
  carregaCliente,
}: ClienteFiltroProps) {
  return (
    <div>
      <Form.InputText
        id="busca-cliente"
        label="Buscar Cliente"
        type="text"
        placeholder="Nome ou CPF"
        icon={Search}
        className="span-full"
        onChange={(e) => buscaCliente(e.target.value)}
      />
      {searchList && (
        <div className="mt-2 max-h-60 overflow-y-auto z-30 shadow w-100 border absolute bg-white border-gray-300 rounded-lg">
          <ul>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <li
                  key={cliente.id}
                  className="cursor-pointer gap-4 flex hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                  onClick={() => carregaCliente(cliente.id)}
                >
                  <span className="font-semibold">{cliente.nome}</span>
                  <span className="text-sm text-text-secondary">
                    {cliente.cpf}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-text-secondary">Nenhum cliente encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
