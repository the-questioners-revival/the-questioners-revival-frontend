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

const CustomModal = forwardRef((props: any, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to open the modal
  const openModal = () => {
    onOpen();
  };

  // Function to close the modal
  const closeModal = () => {
    onClose();
  };

  // Expose modal functions to the parent component using ref
  React.useImperativeHandle(
    ref,
    () =>
      ({
        isOpen,
        openModal,
        closeModal,
      } as any),
    [openModal, closeModal, isOpen],
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
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
              closeModal();
            }}
          >
            {props.primaryActionText}
          </Button>
          <Button variant="ghost" onClick={() => closeModal()}>
            {props.secondaryActionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CustomModal;
