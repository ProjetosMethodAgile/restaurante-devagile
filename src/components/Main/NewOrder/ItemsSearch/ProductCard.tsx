import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { Hash } from "lucide-react";
import Image from "next/image";
const parmesiana = require("@/public/image/foods/parmesiana-1.jpg");

export default function ProductCard() {
  return (
    <li className="w-full rounded-xl shadow-md overflow-hidden bg-white hover:scale-101 transition-all duration-200 ease-in-out">
      <div className="flex items-center justify-center">
        <Image src={parmesiana} alt="Parmaeiana" />
      </div>
      <div className="p-4">
        <div className="text-gray-400 flex items-center gap-1">
          <Hash className="my-2" size={15} />
          <p>PA001</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-md font-semibold text-gray-800">
            Filé Mignon ao Molho
          </h2>
        </div>
        <p className="text-sm font-normal max-lg:text-xs  text-gray-600 mt-1">
          Filé mignon grelhado com molho de vinho tinto, acompanha batatas
          rústicas e legumes.
        </p>
        <div className="mt-4 flex items-center gap-2 justify-between">
          <span className="text-green-600 font-semibold max-lg:text-sm text-lg">
            R$ 68,90
          </span>
          <SecondaryButton
            text="Adicionar"
            className="bg-primary max-lg:text-sm self-end text-blue-50   "
          />
        </div>
      </div>
    </li>
  );
}
