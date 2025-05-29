import { Form } from "@/src/components/Form";
import PrimaryTitle from "@/src/components/UI/PrimaryTitle";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import CategoriesList from "./CategoriesList";

export default function ItemsSearch() {
  return (
    <Form.Section title="Buscar Itens" className="col-span-2 h-full">
      <div className="flex justify-between flex-col  gap-4">
        <CategoriesList />
        <Form.InputText
          id="produto"
          label="Produto"
          type="text"
          placeholder="Descrição, SKU, codigo de barras..."
          icon={Search}
          iconPosition="left"
        />
      </div>
      <ul className="mt-10 grid  grid-cols-6 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-6  ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ul>
    </Form.Section>
  );
}
