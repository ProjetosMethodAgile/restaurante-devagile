import { Search } from "lucide-react";
import { Form } from "./Form";


type PropsFiltroBusca = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function GenericSearch({
  setSearchInput,
  searchInput,
  setSearchTerm,
  setIsLoading,
  setCurrentPage,
}: PropsFiltroBusca) {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchTerm(searchInput);
    setCurrentPage(0);
  };

  return (
    <div className="">

        <div className="">

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
        className="flex mb-3 mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition justify-self-end"
        >
        Buscar
      </button>
          </div>
    </div>
  );
}