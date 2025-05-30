import React from "react";
import { twMerge } from "tailwind-merge";

type PrimaryTitleProps = React.ComponentProps<"h1"> & {
  title: string;
};

export default function PrimaryTitle({
  title,
  className,
  ...props
}: PrimaryTitleProps) {
  return (
    <h1
      className={twMerge(`text-2xl font-semibold text-gray-800`, className)}
      {...props}
    >
      {title}
    </h1>
  );
}
