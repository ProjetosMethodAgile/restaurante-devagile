import { twMerge } from "tailwind-merge";

type primaryButtonProps = React.ComponentProps<"button"> & {
  text: string;
  icon?: React.ElementType;
};

export default function SecondaryButton({
  icon: Icon,
  text,
  className,
  ...props
}: primaryButtonProps) {
  return (
    <button
      className={twMerge(`cursor-pointer py-2 px-3 rounded-lg text-sm flex items-center  justify-center gap-2  font-medium 
              active:scale-95 transition-all duration-150`,className)}
      {...props}
    >
      {Icon && <Icon  />}
      {text}
    </button>
  );
}
