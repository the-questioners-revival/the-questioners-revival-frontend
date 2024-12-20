import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { HEADER } from './CustomHeader';
import { useNavigate } from 'react-router-dom';

function Hamburger({ logout, user }: { logout: Function; user: any }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  function handleClose(link: string) {
    navigate(link);
    onClose();
  }

  return (
    <Box>
      <Button variant="ghost" colorScheme="white" onClick={onOpen}>
        <HamburgerIcon w={8} h={8} />
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
          >
            Menu
            <DrawerCloseButton size="lg" color="black" top="unset" />
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" alignItems="center">
              <Button variant="ghost" onClick={() => handleClose('/')}>
                <Image
                  src="../../favicon.ico"
                  alt="Logo"
                  boxSize="50px"
                  padding={'8px 0px'}
                  minWidth="30px"
                  width="30px"
                />
              </Button>

              <Button variant="ghost" onClick={() => handleClose('/search')}>
                <SearchIcon cursor="pointer" fontSize="20px" />
              </Button>

              <Box
                cursor="pointer"
                p="10px"
                onClick={toggleColorMode}
                fontSize="20px"
              >
                {colorMode === 'light' ? '🌙' : '☀️'}
              </Box>

              {HEADER.map((header) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => handleClose(header.link)}
                  >
                    {header.name}
                  </Button>
                );
              })}
              <Button variant="ghost" onClick={() => logout()}>
                {user ? 'Log out' : 'Login'}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Hamburger;
