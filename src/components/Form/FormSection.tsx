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
        "border-primary-300/20 text-sm font-semibold text-text-secondary  gap-3 mb-2",
        className
      )}
      {...props}
    >
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
