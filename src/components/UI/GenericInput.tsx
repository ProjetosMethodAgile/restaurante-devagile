"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function GenericInput() {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div
      className={`flex items-center border-2 rounded-md px-3 py-2 transition-all duration-200 ${
        inputFocus ? "border-red-500" : "border-gray-300"
      }`}
    >
      <Search className="w-4 h-4 text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Buscar pedido..."
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        className="outline-none text-sm placeholder-gray-400 w-full"
      />
    </div>
  );
}
