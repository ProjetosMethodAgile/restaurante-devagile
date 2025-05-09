import { ReactNode } from "react";

export type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};
export type InputProps = React.ComponentProps<"input"> & {
  icone: string;
};
export type ButtonProps = React.ComponentProps<"button"> & {
  text: string;
  children: ReactNode;
};
