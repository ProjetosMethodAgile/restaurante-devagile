import { BookOpen, User2 } from "lucide-react";

export default function NavigationMenu() {
  return (
    <header className="flex justify-between *:flex *:items-center bg-white px-6 py-4 shadow-bottom shadow-xl">
      <div className="flex items-center gap-2">
        <BookOpen className=" bg-primary p-2 text-card rounded-full size-10" />
        <h1 className="font-semibold text-2xl text-slate-900">Restaurante do Portugues</h1>
      </div>
      <div className="*:flex *:items-center text-text-secondary flex gap-10 ">
        <ul className="gap-6 *:cursor-pointer *:hover:text-primary *:font-semibold">
          <li>Pedidos</li>
          <li>Clientes</li>
          <li>Relatorios</li>
          <li>Sair</li>
        </ul>
        <div className="gap-4">
          <h3>Otavio</h3>
          <User2 className="bg-primary/50 text-primary p-1 rounded-full size-10"/>
        </div>
      </div>
    </header>
  );
}
