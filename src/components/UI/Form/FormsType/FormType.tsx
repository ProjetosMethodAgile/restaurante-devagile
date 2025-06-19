import { ReactNode } from "react";

export type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export type BaseInputProps = {
  className?: string;
  label?: string;
  error?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  classDiv?: string;
  defaultValue?: string
};
export type InputProps = BaseInputProps & React.ComponentProps<"input">;

export type FormInputOptionsProps = BaseInputProps &
  React.ComponentProps<"select"> & {
    options: { value: string; label: string }[];
  };
