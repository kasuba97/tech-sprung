import { Dispatch, FC } from "react";
import { VisibilityOffIcon, VisibilityOnIcon } from "./icons";
import { Flex } from "@mantine/core";

type TogglePassProps = {
  showPass: boolean;
  setShowPass: Dispatch<React.SetStateAction<boolean>>;
  className: string;
};

const TogglePass: FC<TogglePassProps> = ({
  showPass,
  setShowPass,
  className,
}) => {
  return (
    <Flex
      onClick={() => {
        setShowPass(!showPass);
      }}
      className={className}
    >
      {showPass ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
    </Flex>
  );
};

export default TogglePass;
