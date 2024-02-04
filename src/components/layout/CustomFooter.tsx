import { Box } from "@chakra-ui/react";

const CustomFooter = () => {
  const date = new Date();
  return (
    <Box>
      Copyright © {date.getFullYear()} The Questioners Revival | All Rights
      Reserved
    </Box>
  );
};

export default CustomFooter;
