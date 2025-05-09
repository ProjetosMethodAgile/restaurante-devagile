export default function PrimaryButton({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-medium 
              hover:bg-red-700 active:scale-95 transition-all duration-150"`}
      {...props}
    >
      {children}
    </button>
  );
}
