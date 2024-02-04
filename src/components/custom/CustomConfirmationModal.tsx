import React, { forwardRef, useRef, useState } from 'react';
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
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.description}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.primaryAction();
              props.closeModal();
            }}
          >
            {props.primaryActionText}
          </Button>
          <Button variant="ghost" onClick={() => props.closeModal()}>
            {props.secondaryActionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
