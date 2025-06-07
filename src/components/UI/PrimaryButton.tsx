type primaryButtonProps = React.ComponentProps<"button"> & {
  text: string;
  icon?: React.ElementType;
  isPending?: boolean;
};
import { twMerge } from "tailwind-merge";

export default function PrimaryButton({
  icon: Icon,
  text,
  className,
  isPending,
  ...props
}: primaryButtonProps) {
  return (
    <button
      className={twMerge(
        `flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-medium 
              hover:bg-red-700 active:scale-95 transition-all duration-150`,
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={twMerge(
            "w-4 h-4 transition-opacity duration-200",
            !isPending ? "animate-spin opacity-60" : ""
          )}
        />
      )}
      {text}
    </button>
  );
}
