import { twMerge } from "tailwind-merge";
import { InputProps } from "./FormsType/FormType";

export default function FormInputAll({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        `w-full active:border-primary text-text-secondary py-2 px-4 rounded-lg active:scale-102 ease-out duration-75 cursor-pointer hover:border-primary/70 transition duration-300 mt-4`,
        className
      )}
      {...props}
    />
  );
}
