import React from "react";
import { twMerge } from "tailwind-merge";

type FormInputIconProps = React.PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement>
>;

export default function FormInputIcon({
  className,
  children,
  ...props
}: FormInputIconProps) {
  return (
    <div
      className={twMerge(
        " flex  flex-row-reverse border border-gray-300",
        className
      )}
    >
      <div className="size-5 absolute">{children}</div>
      <input
        {...props}
          className={` text-text-secondary relative w-full px-4 py-2 rounded-lg focus:outline-primary `}
        />
    </div>
  );
}
