import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Select,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import CustomModal from '../custom/CustomModal';
import EditQaaForm from './EditQaaForm';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';

const showOptions = [
  {
    name: 'true',
    value: 'true',
  },
  {
    name: 'false',
    value: 'false',
  },
];

const typeOptions = [
  {
    name: 'Personal',
    value: 'personal',
  },
  {
    name: 'Project',
    value: 'project',
  },
  {
    name: 'Work',
    value: 'work',
  },
];

const QaaList = ({
  qaas,
  removeQaa,
  type,
  setType,
  showRemoved,
  setShowRemoved,
  editQaa,
}: {
  qaas: any;
  removeQaa: Function;
  type?: string;
  setType?: Function;
  showRemoved?: string;
  setShowRemoved?: Function;
  editQaa: Function;
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<[Number?]>([]);
  const editModalRef = useRef<any>();
  const modalRef = useRef<any>();
  const [qaaSelected, setQaaSelected] = useState<any>();

  const handleItemClick = (itemId: any) => {
    setSelectedItemIds((prevSelectedIds: any) => {
      if (prevSelectedIds.includes(itemId)) {
        // If the item is already selected, remove it
        return prevSelectedIds.filter((id: any) => id !== itemId);
      } else {
        // If the item is not selected, add it
        return [...prevSelectedIds, itemId];
      }
    });
  };

  return (
    <Box paddingTop="15px">
      <Flex justifyContent="space-between">
        <Heading as="h2" size="lg">
          Qaas
        </Heading>
        <Flex>
          <Select
            value={showRemoved}
            onChange={(evt) =>
              setShowRemoved && setShowRemoved(evt.target.value)
            }
            placeholder="Show Removed"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {showOptions?.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(evt) => setType && setType(evt.target.value)}
            placeholder="Type"
            color="black"
            bg="white"
          >
            {typeOptions?.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Text>Number of qaas: {qaas?.length}</Text>
      {qaas?.map((qaa: any) => (
        <Box
          marginBottom="10px"
          border="2px solid white"
          borderRadius="10"
          _hover={{ cursor: 'pointer' }}
          key={qaa.id} // Added key prop
          padding="5px 10px"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              w="100%"
              onClick={() => handleItemClick(qaa?.id)}
            >
              {/* <CheckIcon w={4} h={4} color="black" /> */}
              <Text
                fontSize="lg"
                paddingRight="7px"
                textDecorationLine={`${qaa?.deleted_at ? 'line-through' : ''}`}
              >
                {qaa.question}
              </Text>
              <Tag>{qaa.type}</Tag>
            </Box>

            <Flex>
              <EditIcon
                w={4}
                h={4}
                marginRight="10px"
                color="white"
                onClick={() => {
                  editModalRef?.current?.isOpen
                    ? editModalRef?.current?.closeModal()
                    : editModalRef?.current?.openModal();
                  setQaaSelected(qaa);
                }}
              />
              <CloseIcon
                w={4}
                h={4}
                color="white"
                onClick={() => {
                  modalRef?.current?.isOpen
                    ? modalRef?.current?.closeModal()
                    : modalRef?.current?.openModal();
                  setQaaSelected(qaa);
                }}
              />
            </Flex>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              paddingRight="7px"
              display={selectedItemIds.includes(qaa?.id) ? 'block' : 'none'}
            >
              {qaa.answer}
            </Text>
            <Link href={qaa.link} isExternal fontSize="lg" paddingRight="7px">
              {qaa.link}
            </Link>
          </Box>
        </Box>
      ))}
      <CustomConfirmationModal
        ref={modalRef as any}
        primaryAction={() => {
          removeQaa(qaaSelected?.id);
          modalRef?.current?.closeModal();
        }}
        secondaryAction={() => {}}
        title={`Remove qaa`}
        description={`Are you sure you want to remove qaa with id ${qaaSelected?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
      <CustomModal ref={editModalRef as any}>
        <ModalHeader>Edit Qaa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditQaaForm
            qaa={qaaSelected}
            editQaa={(data: any) => {
              editQaa(data);
              editModalRef?.current?.closeModal();
            }}
          />
        </ModalBody>
      </CustomModal>
    </Box>
  );
};

export default QaaList;
