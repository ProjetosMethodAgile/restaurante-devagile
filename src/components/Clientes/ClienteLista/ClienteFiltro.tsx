import React from "react";
import { Form } from "../../UI/Form";
import { Search } from "lucide-react";

type PropsFiltroClientes = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function ClienteFiltro({
  setSearchInput,
  searchInput,
  setSearchTerm,
  setIsLoading,
  setCurrentPage,
}: PropsFiltroClientes) {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchTerm(searchInput);
    setCurrentPage(0);
  };

  return (
    <div className="flex justify-end gap-4 mb-4">

        <div className="flex-1">

      <Form.InputText
        type="text"
        placeholder="Buscar por nome ou telefone"
        id="search"
        value={searchInput}
        onChange={handleSearchInputChange}
        icon={Search}
        className=""
        />
      <button
        type="button"
        onClick={handleSearchClick}
        className="flex mb-10 mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition justify-self-end"
        >
        Buscar
      </button>
          </div>
    </div>
  );
}
