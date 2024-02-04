import React, { forwardRef, useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

const CustomModal = (props: any) => {

  return (
    <Modal isOpen={props.isOpen} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent>
        {props.children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
