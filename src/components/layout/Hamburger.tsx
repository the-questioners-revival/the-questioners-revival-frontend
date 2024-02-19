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
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { HEADER } from './CustomHeader';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';

function Hamburger({
  handleSearchOpen,
  logout,
  user,
}: {
  handleSearchOpen: MouseEventHandler<HTMLButtonElement>;
  logout: Function;
  user: any;
}) {
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

              <Button variant="ghost" onClick={handleSearchOpen}>
                <SearchIcon cursor="pointer" fontSize="20px" />
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Hamburger;
