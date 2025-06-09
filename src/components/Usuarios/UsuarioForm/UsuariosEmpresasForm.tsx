import React from "react";
import SecondaryTitle from "../../UI/SecondaryTitle";
import { Check, Plus, X } from "lucide-react";
import { currentUserProps } from "./UsuariosForm";

export default function UsuarioEmpresasForm({
  currentUser,
  setCurrentUser,
  empresas,
}: currentUserProps & { empresas: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-2 col-span-full">
      {/* Empresas Disponíveis */}
      <div>
        <SecondaryTitle title="Empresas disponíveis" />
        <ul className="bg-slate-50 flex flex-col gap-4 h-25 overflow-y-auto p-4 rounded-xl">
          {empresas.map((empresa) => {
            const jaAdicionada = currentUser.empresaIds.some(
              (e) => e.id === empresa.value
            );

            return (
              <li
                key={empresa.value}
                className="flex items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold bg-sky-200 text-sm text-sky-600 rounded-full p-1">
                    {empresa.label.slice(0, 2).toUpperCase()}
                  </span>
                  {empresa.label}
                </div>

                {jaAdicionada ? (
                  <Check
                    size={18}
                    className="bg-green-500 rounded-full text-white p-0.5"
                  />
                ) : (
                  <Plus
                    size={18}
                    className="bg-secondary rounded-full min-w-4 min-h-4 text-white p-0.5 cursor-pointer"
                    onClick={() =>
                      setCurrentUser((prev) => ({
                        ...prev,
                        empresaIds: [
                          ...prev.empresaIds,
                          { id: empresa.value, nome: empresa.label },
                        ],
                      }))
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Empresas Vinculadas */}
      <div className="h-full">
        <SecondaryTitle title="Empresas Vinculadas" />
        <ul className="flex gap-2 self-start flex-wrap h-25 p-4 border rounded-xl border-secondary/20 overflow-y-auto">
          {currentUser.empresaIds.length > 0 ? (
            currentUser.empresaIds.map((empresa) => (
              <li
                key={empresa.id}
                className="flex items-center gap-2 justify-between bg-secondary/10 py-1 px-4 rounded-xl self-start"
              >
                <span>{empresa.nome}</span>
                <X
                  size={15}
                  className="bg-primary rounded-full hover:scale-102 transition-all cursor-pointer text-white p-0.5"
                  onClick={() =>
                    setCurrentUser((prev) => ({
                      ...prev,
                      empresaIds: prev.empresaIds.filter(
                        (item) => item.id !== empresa.id
                      ),
                    }))
                  }
                />
              </li>
            ))
          ) : (
            <li className="text-gray-600">Nenhuma empresa adicionada</li>
          )}
        </ul>
      </div>
    </div>
  );
}
