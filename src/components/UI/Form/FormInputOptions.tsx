import { twMerge } from "tailwind-merge";
import { FormInputOptionsProps } from "./FormsType/FormType";

export default function FormInputOptions({
  label,
  // icon: Icon,
  className,
  disabled,
  options,
  defaultValue,
  ...props
}: FormInputOptionsProps) {
  const containerClass = twMerge(
    `flex py-2 px-4 items-center transition justify-between 
    border rounded-lg text-sm sm:text-base text-text-secondary 
    ease-out hover:border-primary/70 z-10 active:ring-2 ring-red-200 active:border-primary itens-center gap-2 
    focus:ring-3 focus:ring-red-200 focus:outline-none focus:ring-2  w-full`,
    disabled
      ? "bg-gray-100 border-gray-300 pointer-events-none opacity-60"
      : "border-gray-300",
    className
  );

  return (
    <div className=" ">
      {label && (
        <label className="text-text-secondary mb-2 text-sm">{label}</label>
      )}
      <select {...props} defaultValue={defaultValue} className={containerClass}>
        <option value="default">Escolha por {label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
