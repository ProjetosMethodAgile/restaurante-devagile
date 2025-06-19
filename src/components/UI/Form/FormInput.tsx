import { twMerge } from "tailwind-merge";
import { InputProps } from "./FormsType/FormType";

export default function FormInput({
  label,
  icon: Icon,
  iconPosition = "right",
  className,
  disabled,
  ...props
}: InputProps) {
  const containerClass = twMerge(
    `flex py-2 px-4 items-center transition justify-between 
    border rounded-lg text-sm sm:text-base text-text-secondary 
    ease-out hover:border-primary/70 active:scale-102 active:border-primary itens-center gap-2 
    focus:outline-none focus:ring-2 focus:ring-[#D72626]`,
    disabled
      ? "bg-gray-100 border-gray-300 pointer-events-none opacity-60"
      : "border-gray-300",
    className
  );

  return (
    <div >
      {label && <label className="text-text-secondary  text-sm">{label}</label>}
      <div className={containerClass}>
        {Icon && iconPosition === "left" ? <Icon size={20} /> : null}
        <input
          disabled={disabled}
          className={twMerge(
            `outline-none text-md font-medium text-black/80 bg-transparent w-full`,
            className
          )}
          {...props}
        />
        {Icon && iconPosition === "right" ? <Icon size={20} /> : null}
      </div>
    </div>
  );
}
