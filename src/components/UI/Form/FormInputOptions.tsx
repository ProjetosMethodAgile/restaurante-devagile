import { twMerge } from "tailwind-merge";
import { InputProps } from "./FormsType/FormType";

export default function FormInputOptions({
  label,
  icon: Icon,
  iconPosition = "right",
  className,
  disabled,
  ...props
}: InputProps) {
  const containerClass = twMerge(
    `flex mt-1 py-2 px-4 items-center transition justify-between 
    border rounded-lg text-sm sm:text-base text-text-secondary 
    ease-out hover:border-primary/70 active:scale-102 active:border-primary itens-center gap-2 
    focus:outline-none focus:ring-2 focus:ring-[#D72626]`,
    disabled
      ? "bg-gray-100 border-gray-300 pointer-events-none opacity-60"
      : "border-gray-300",
    className
  );

  return (
    <div className="mt-1 ">
      {label && (
        <label className="text-text-secondary mb-2 text-sm">{label}</label>
      )}
      <select className={containerClass}>
        <option value="1">MOBILI COMERCIO DE PEÇAS E ACESSORIO</option>
        <option value="2">A MAIS CICLO COMERCIO</option>
      </select>
    </div>
  );
}
