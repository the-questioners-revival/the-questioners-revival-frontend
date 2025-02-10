import { Tooltip, useDisclosure } from "@chakra-ui/react";

const CustomTooltip = (props: any) => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  return (
    <Tooltip label={props.label} isOpen={isOpen} placement={props.placement} hasArrow={props.hasArrow}>
      <div
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onClick={onToggle}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};

export default CustomTooltip;
