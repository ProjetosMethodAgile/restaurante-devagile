import { twMerge } from "tailwind-merge";
import iconsMap from "./../../utils/iconsMap";
import { InputProps } from "./FormsType/FormType";
type FormInputPropsIcons= React.ComponentProps<"input"> &{
  icone:string
}
export default function FormInputIcon({className,...props  }: FormInputPropsIcons) {
  const Icone = iconsMap[props.icone];
  return (
    <div className={twMerge(`bg-card`, className)} >
        <div className="size-10">
            {Icone?<Icone/>:""}
        </div>
      <input {...props} />
    </div>
  );
}
