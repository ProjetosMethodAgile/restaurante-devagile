'use client'
import { Search } from "lucide-react";
import { Form } from "../../UI/Form";

export default function ProdutosFiltro() {
  return (
    <div className="flex-1">
      <Form.InputText
        type="text"
        placeholder="Buscar por nome ou código do produto"
        id="search"
        icon={Search}
      />
    </div>
  );
}
