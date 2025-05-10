import { ReactNode } from "react";

export type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};
export type InputProps = React.ComponentProps<"input"> 

export type ButtonProps = React.ComponentProps<"button"> & {
  children: ReactNode;
};
