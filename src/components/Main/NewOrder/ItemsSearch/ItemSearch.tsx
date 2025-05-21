import { Form } from "@/src/components/Form";
import PrimaryTitle from "@/src/utils/UI/PrimaryTitle";
import SecondaryButton from "@/src/utils/UI/SecondaryButton";
import { Search, ShoppingBasket } from "lucide-react";

export default function ItemsSearch() {
  return (
    <Form.Section title="Buscar Itens" className="col-span-2 h-full">
      <div className="flex justify-between flex-col  gap-4">
        <Form.InputALL
          id="produto"
          label="Produto"
          type="text"
          placeholder="Nome, SKU, codigo de barras..."
          icon={Search}
          className="w-100"
          iconPosition="left"
        />
        <div className="">
          <PrimaryTitle title="Categorias" />
          <ul className=" flex *:hover:shadow-md transition-all  *:rounded-3xl *:px-6 *:cursor-pointer text-primary *:shadow gap-4 mt-2 *:py-2 *:text-center text-lg *:font-semibold *:gap-2 *:items-center">
            <li className="bg-primary text-white">Todas</li>
            <li className="bg-white">Entradas</li>
            <li className="bg-white">Pratos Principais</li>
            <li className="bg-white">Massas</li>
            <li className="bg-white">Sobremesas</li>
            <li className="bg-white">Bebidas</li>
          </ul>
        </div>
      </div>
      <div>
        
      </div>
    </Form.Section>
  );
}
