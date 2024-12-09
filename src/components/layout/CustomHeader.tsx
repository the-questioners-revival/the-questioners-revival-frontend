import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Link as ChakraLink,
  Image,
  useColorModeValue,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
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
  {
    name: 'Calendar',
    link: '/calendar',
  },
  {
    name: 'Category',
    link: '/category',
  },
];

const CustomHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useUser();

  return (
    <Flex
      paddingX={{ base: '10px', md: '150px' }}
      alignItems="center"
      w="100%"
      justifyContent="space-between"
      boxShadow="0px 1px 5px rgba(190, 190, 190, 0.46) !important"
    >
      {/* Logo */}
      <Box marginRight="10px">
        <Link to="/">
          <Image
            src={
              colorMode === 'light'
                ? '../../favicon.ico'
                : '../../faviconLight.ico'
            }
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
        <Flex alignItems="center">
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
        </Flex>
        <Flex alignItems="center">
          <Box
            cursor="pointer"
            p="10px"
            marginRight="15px"
            onClick={toggleColorMode}
            fontSize="20px"
          >
            {colorMode === 'light' ? '🌙' : '☀️'}
          </Box>
          <ChakraLink as={Link} to="/search" fontSize="lg">
            <SearchIcon fontSize="20px" marginRight="20px" cursor="pointer" />
          </ChakraLink>

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
      <Flex display={{ base: 'flex', md: 'none' }}>
        <Hamburger logout={logout} user={user} />
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
