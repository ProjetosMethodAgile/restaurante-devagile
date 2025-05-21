import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="ml-auto flex  items-center justify-between gap-2 bg-gray-50 rounded-md p-2 w-24">
      <Minus
        size={20}
        className="bg-primary cursor-pointer text-red-50 rounded-full p-1"
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
      />
      <span>{count}</span>
      <Plus
        size={20}
        className="bg-primary cursor-pointer text-red-50 rounded-full p-1"
        onClick={() => {
          setCount(count + 1);
        }}
      />
    </div>
  );
}
