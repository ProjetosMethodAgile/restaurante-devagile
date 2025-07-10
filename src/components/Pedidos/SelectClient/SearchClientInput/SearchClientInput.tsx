import { ClienteBase } from "@/src/types/cliente/clientType";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useStep } from "../../StepPedido/StepContext";
import { PlusCircle, Search, X } from "lucide-react";
import { Form } from "@/src/components/UI/Form";

export type SearchClientInputProps = React.ComponentProps<"div"> & {
  clientes: ClienteBase[];
  setOpenModalCreateCliente: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchClientInput({
  clientes,
  setOpenModalCreateCliente,
  ...props
}: SearchClientInputProps) {
  const { currentClient, setCurrentClient } = useStep();
  const [filteredClientes, setFilteredClientes] =
    React.useState<ClienteBase[]>(clientes);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchList, setSearchList] = React.useState<boolean>(false);

  function buscaCliente(value: string) {
    setSearchTerm(value);
    if (!value) {
      setSearchList(false);
      setFilteredClientes(clientes);
      return;
    }
    const lower = value.toLowerCase();
    setFilteredClientes(
      clientes.filter(
        (c) =>
          c.nome.toLowerCase().includes(lower) ||
          c.cpf?.includes(lower) ||
          c.contato.includes(lower)
      )
    );
    setSearchList(true);
  }

  function carregaCliente(clientId: string) {
    const found = clientes.find((c) => c.id === clientId) || null;
    setCurrentClient(found);
    setSearchTerm(found ? found.nome : "");
    setSearchList(false);
  }
  return (
    <div className="relative">
      {(searchTerm || currentClient) && (
        <motion.div
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          title="apagar texto"
          onClick={() => {
            setCurrentClient(null);
            setSearchTerm("");
            setSearchList(false);
          }}
          className="text-primary absolute left-[-25] bottom-[7] cursor-pointer hover:text-700 hover:scale-110 transition-all duration-150"
        >
          <X />
        </motion.div>
      )}
      <Form.InputText
        id="busca-cliente"
        label="Buscar Cliente"
        type="text"
        placeholder="Nº contato, Nome ou CPF"
        icon={Search}
        className="span-full"
        value={searchTerm}
        onChange={(e) => buscaCliente(e.target.value)}
      />
      {searchList && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-md z-30"
        >
          <ul>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((c) => (
                <li
                  key={c.id}
                  className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => carregaCliente(c.id)}
                >
                  <span className="w-30 truncate font-semibold" title={c.nome}>
                    {c.nome.length > 12 ? c.nome.slice(0, 12) + "..." : c.nome}
                  </span>
                  <span className="w-25 text-sm text-text-secondary ">
                    {c.contato}
                  </span>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-text-secondary hover:bg-gray-100 flex gap-2 flex-wrap items-center justify-between">
                <p className="cursor-default"> Nenhum cliente encontrado</p>
                <button
                  className="cursor-pointer flex gap-1 bg-primary text-white rounded-lg p-2 hover:bg-red-700 active:scale-95 transition-all duration-150"
                  onClick={() => {
                    setSearchList(false);
                    setOpenModalCreateCliente(true);
                  }}
                >
                  <PlusCircle className="" /> adicionar novo
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
