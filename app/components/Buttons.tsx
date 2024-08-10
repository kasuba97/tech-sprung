import { Button } from "@mantine/core";
import { FC } from "react";

type ButtonProps = {
  label: string;
  onClick?: Function;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
};

export const PrimaryButton: FC<ButtonProps> = ({ label, className, type }) => {
  return (
    <Button type={type} className={className} bg={"#d6eadf"}>
      {label}
    </Button>
  );
};

export const SecondaryButton: FC<ButtonProps> = ({
  label,
  className,
  type,
}) => {
  return (
    <Button type={type} className={className} bg={"#809bce"}>
      {label}
    </Button>
  );
};
