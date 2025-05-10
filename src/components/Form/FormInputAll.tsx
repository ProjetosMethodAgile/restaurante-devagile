import { twMerge } from "tailwind-merge";
import { InputProps } from "./FormsType/FormType";

export default function FormInputAll({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        `bg-card border-text-secondary border border-1 rounded-[15px]`,
        className
      )}
      {...props}
    />
  );
}
