import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";

export default function CategoriesList() {
  return (
    <div className="">
      <PrimaryTitle title="Categorias" />
      <ul className=" flex *:hover:shadow-md transition-all max-xl:*:text-md  flex-wrap *:rounded-3xl *:px-6 *:cursor-pointer text-primary *:shadow gap-4 mt-2 *:py-2 *:text-center text-lg *:font-semibold *:gap-2 *:items-center">
        <li className="bg-primary text-white">Todas</li>
        <li className="bg-white">Entradas</li>
        <li className="bg-white">Pratos Principais</li>
        <li className="bg-white">Massas</li>
        <li className="bg-white">Sobremesas</li>
        <li className="bg-white">Bebidas</li>
      </ul>
    </div>
  );
}
