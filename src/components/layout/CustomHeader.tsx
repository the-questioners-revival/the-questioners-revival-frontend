import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useUser } from '../../providers/UserProvider';
import Hamburger from './Hamburger';
import CustomModal from '../custom/CustomModal';
import SearchModal from './SearchModal';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchOpen = () => {
    setIsOpen(true);
  };

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
        <Flex alignItems="center">
          <SearchIcon
            fontSize="20px"
            onClick={handleSearchOpen}
            marginRight="20px"
            cursor="pointer"
          />

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
        <Hamburger
          handleSearchOpen={handleSearchOpen}
          logout={logout}
          user={user}
        />
      </Flex>
      <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Flex>
  );
};

export default CustomHeader;
