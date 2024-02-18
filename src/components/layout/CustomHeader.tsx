import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Image } from '@chakra-ui/react';
import { useUser } from '../../providers/UserProvider';
import Hamburger from './Hamburger';

export const HEADER = [
  {
    name: 'Todos',
    link: '/todos',
  },
  {
    name: 'Qaas',
    link: '/qaas',
  },
  {
    name: 'Summary',
    link: '/summary',
  },
  {
    name: 'Habits',
    link: '/habits',
  },
  {
    name: 'Goals',
    link: '/goals',
  },
  {
    name: 'Reviews',
    link: '/reviews',
  },
];

const CustomHeader = () => {
  const { user, logout } = useUser();

  return (
    <Flex alignItems="center" w="100%" justifyContent="space-between">
      {/* Logo */}
      <Box marginRight="10px">
        <Link to="/">
          <Image
            src="../../favicon.ico"
            alt="Logo"
            boxSize="50px"
            padding={'8px 0px'}
            minWidth="30px"
            width="30px"
          />
        </Link>
      </Box>
      {/* Navigation Links */}
      <Flex
        justifyContent="space-between"
        w="100%"
        display={{ base: 'none', md: 'flex' }}
      >
        <Box>
          <ChakraLink
            as={Link}
            to="/todos"
            marginRight={4}
            fontSize="lg"
          ></ChakraLink>
          {HEADER.map((header) => (
            <ChakraLink
              as={Link}
              to={header.link}
              marginRight={4}
              fontSize="lg"
            >
              {header.name}
            </ChakraLink>
          ))}
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
      <Flex display={{ base: 'flex', md: 'none' }}>
        <Hamburger />
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
