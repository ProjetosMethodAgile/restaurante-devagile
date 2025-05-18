import { twMerge } from "tailwind-merge";

type FormSectionProps = React.ComponentProps<"div"> & {
  title?: string;
  children?: React.ReactNode;
};

export default function FormSection({
  title,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <div
      className={twMerge(
        "border-primary-300/20 text-sm font-semibold flex flex-col text-text-secondary  gap-2 ",
        className
      )}
      {...props}
    >
      {title && <h3 className="mb-2 text-lg">{title}</h3>}
      {children}
    </div>
  );
}
