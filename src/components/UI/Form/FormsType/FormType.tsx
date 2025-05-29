import { ReactNode } from "react";

export type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};
export type InputProps = React.ComponentProps<"input"> & {
  className?: string;
  label?: string;
  error?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  classDiv?: string;
}

export type ButtonProps = React.ComponentProps<"button"> & {
  children: ReactNode;
};
