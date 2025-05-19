import { twMerge } from "tailwind-merge";
import { InputProps } from "./FormsType/FormType";

export default function FormInputAll({
  label,
  icon: Icon,
  iconPosition = "right",
  className,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="text-text-secondary mb-2 text-sm">{label}</label>
      )}
      <div className="flex gap-2 items-center transition justify-between  active:border-primary px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base disabled:bg-gray-100 disabled:hover:border-gray-300 disabled:transition-none text-text-secondary active:scale-102 ease-out  hover:border-primary/70 ">
        {Icon && iconPosition === "left" ? <Icon size={20} /> : ""}
        <input className={twMerge(`outline-none text-md font-medium `, className)} {...props} />
        {Icon && iconPosition === "right" ? <Icon size={20} /> : ""}
      </div>
    </div>
  );
}
