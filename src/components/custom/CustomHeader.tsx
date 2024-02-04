import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Link as ChakraLink,
  Image,
} from '@chakra-ui/react';

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
        <ChakraLink as={Link} to="/summary" fontSize="lg">
          Summary
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default CustomHeader;
