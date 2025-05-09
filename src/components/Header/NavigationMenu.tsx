export default function NavigationMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">Menu de Navegação</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="/home" className="text-blue-500 hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="text-blue-500 hover:underline">
            Sobre
          </a>
        </li>
        <li>
          <a href="/contact" className="text-blue-500 hover:underline">
            Contato
          </a>
        </li>
      </ul>
    </div>
  );
}