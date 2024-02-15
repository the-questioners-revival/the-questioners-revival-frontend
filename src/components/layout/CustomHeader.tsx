import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Image } from '@chakra-ui/react';
import { removeCookies } from '../../utils';
import { useUser } from '../../providers/UserProvider';

const CustomHeader = () => {
  const { user, logout } = useUser();

  return (
    <Flex alignItems="center" w="100%">
      {/* Logo */}
      <Box marginRight="10px">
        <Link to="/">
          <Image
            src="../../favicon.ico"
            alt="Logo"
            boxSize="50px"
            padding={'8px 0px'}
            minWidth='30px'
            width='30px'
          />
        </Link>
      </Box>
      {/* Navigation Links */}
      <Flex justifyContent="space-between" w="100%">
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
          <ChakraLink as={Link} to="/reviews" marginRight={4} fontSize="lg">
            Reviews
          </ChakraLink>
        </Box>
        <ChakraLink
          as={Link}
          to="/login"
          marginRight={4}
          fontSize="lg"
          onClick={() => {
            logout();
          }}
        >
          {user ? 'Log out' : 'Login'}
        </ChakraLink>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
