import iconsMap from "./../../utils/iconsMap";
import { InputProps } from "./FormsType/FormType";
type InputPropsIcone = React.ComponentProps<"input"> &{
  icone:string
}
export default function FormInput({ ...props }: InputPropsIcone) {
  const Icone = iconsMap[props.icone];
  return (
    <div>
      <div>{Icone ? <Icone /> : ""}</div>
      <input {...props} />
    </div>
  );
}
