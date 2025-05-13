type primaryButtonProps = React.ComponentProps<"button"> & {
  text: string;
  icon?: React.ElementType;
};

export default function PrimaryButton({
  icon: Icon,
  text,
  ...props
}: primaryButtonProps) {
  return (
    <button
      className={`flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-medium 
              hover:bg-red-700 active:scale-95 transition-all duration-150`}
      {...props}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
}
