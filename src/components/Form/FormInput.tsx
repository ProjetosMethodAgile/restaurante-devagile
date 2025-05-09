import iconsMap from "./../../utils/iconsMap";
import { InputProps } from "./FormsType/FormType";

export default function FormInput({...props }: InputProps) {
  const Icone = iconsMap[props.icone];
  return (
    <div>
        <div>
            {Icone?<Icone/>:""}
          
        </div>
      <input {...props} />
    </div>
  );
}
