"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({
  children,
  className,
  ...props
}: FormRootProps) {
  return (
    <form className={twMerge(`rounded-xl w-full`, className)} {...props}>
      {children}
    </form>
  );
}
