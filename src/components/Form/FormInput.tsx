import iconsMap from "./../../utils/iconsMap";
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
