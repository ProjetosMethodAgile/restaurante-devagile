import { ButtonProps } from "./FormsType/FormType";

export default function FormButton({ children,...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
