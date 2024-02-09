import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Image } from '@chakra-ui/react';

const CustomHeader = () => {
  return (
    <Flex alignItems="center">
      {/* Logo */}
      <Box marginRight="10px">
        <Link to="/">
          <Image
            src="https://via.placeholder.com/50"
            alt="Logo"
            boxSize="50px"
          />
        </Link>
      </Box>
      {/* Navigation Links */}
      <Box>
        <ChakraLink as={Link} to="/todos" marginRight={4} fontSize="lg">
          Todos
        </ChakraLink>
        <ChakraLink as={Link} to="/qaas" marginRight={4} fontSize="lg">
          Qaas
        </ChakraLink>
        <ChakraLink as={Link} to="/summary" marginRight={4} fontSize="lg">
          Summary
        </ChakraLink>
        <ChakraLink as={Link} to="/habits" marginRight={4} fontSize="lg">
          Habits
        </ChakraLink>
        <ChakraLink as={Link} to="/goals" marginRight={4} fontSize="lg">
          Goals
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default CustomHeader;
