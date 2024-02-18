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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HEADER } from './CustomHeader';
import { useNavigate } from 'react-router-dom';

function Hamburger() {
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
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Hamburger;
