import {
  Modal,
  ModalOverlay,
  ModalContent,
 
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
