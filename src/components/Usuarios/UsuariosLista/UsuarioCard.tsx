import { UsuarioBase } from "@/src/types/user/userType";
import { Clock, Key, KeyIcon, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { PassThrough } from "stream";
type UsuarioCardProps = {
  usuario: UsuarioBase;
};

export default function UsuarioCard({ usuario }: UsuarioCardProps) {
  const [keyButton, setKeyButton] = React.useState(false);

  return (
    <div className="bg-blue-50  p-4 rounded-xl shadow-sm w-85 hover:scale-101 transition-transform ease-in-out">
      <div className="flex items-start gap-4">
        <div className="bg-blue-500 text-white font-bold rounded-full min-w-10 min-h-10 flex items-center justify-center text-lg">
          {usuario.nome
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm text-gray-800">
                {usuario.nome}
              </h2>
              <p className="text-gray-500 text-xs">{usuario.role.nome}</p>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              Ativo
            </span>
          </div>
          <div className="mt-3 flex items-center  gap-2 space-y-1 text-sm text-gray-600">
            <Mail size={15} />
            <span className=" block truncate max-w-[220px]">
              {usuario.email}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end *:cursor-pointer gap-4 border-t border-slate-200 pt-3 mt-4 text-sm">
        <button className="text-blue-600 hover:underline">
          <Link href={`/app/usuarios/form/${usuario.id}`}>Editar</Link>
        </button>
        <button className="text-red-600 hover:underline">Desativar</button>
      </div>
    </div>
  );
}
