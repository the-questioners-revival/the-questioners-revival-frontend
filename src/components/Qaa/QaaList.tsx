import {
  Box,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import CustomModal from '../custom/CustomModal';
import EditQaaForm from './EditQaaForm';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import QaaListItem from './QaaListItem';
import { qaaTypeOptions } from './CreateQaaForm';
import { limitOptions } from '../Todo/TodoList';

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

const QaaList = ({
  qaas,
  removeQaa,
  type,
  setType,
  showRemoved,
  setShowRemoved,
  editQaa,
  limit,
  setLimit,
}: {
  qaas: any;
  removeQaa: Function;
  type?: string;
  setType?: Function;
  showRemoved?: string;
  setShowRemoved?: Function;
  editQaa: Function;
  limit?: number;
  setLimit?: Function;
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<[Number?]>([]);
  const [isOpenDeleteQaaModal, setIsOpenDeleteQaaModal] = useState(false);
  const [isOpenEditQaaModal, setIsOpenEditQaaModal] = useState(false);
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
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(evt) => setType && setType(evt.target.value)}
            placeholder="Type"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {qaaTypeOptions?.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Select
            value={limit}
            onChange={(evt) => setLimit && setLimit(evt.target.value)}
            placeholder="Per page"
            color="black"
            bg="white"
          >
            {limitOptions?.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Text>Number of qaas: {qaas?.length}</Text>
      {qaas?.map((qaa: any) => (
        <QaaListItem
          key={qaa.id}
          qaa={qaa}
          setQaaSelected={setQaaSelected}
          isOpenEditQaaModal={isOpenEditQaaModal}
          setIsOpenEditQaaModal={setIsOpenEditQaaModal}
          isOpenDeleteQaaModal={isOpenDeleteQaaModal}
          setIsOpenDeleteQaaModal={setIsOpenDeleteQaaModal}
          isOpenAnswer={selectedItemIds.includes(qaa?.id)}
          openAnswer={handleItemClick}
        />
      ))}
      <CustomConfirmationModal
        isOpen={isOpenDeleteQaaModal}
        closeModal={() => setIsOpenDeleteQaaModal(false)}
        primaryAction={() => {
          removeQaa(qaaSelected?.id);
          setIsOpenDeleteQaaModal(false);
        }}
        secondaryAction={() => {}}
        title={`Remove qaa`}
        description={`Are you sure you want to remove qaa with id ${qaaSelected?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
      <CustomModal
        isOpen={isOpenEditQaaModal}
        closeModal={() => setIsOpenEditQaaModal(false)}
      >
        <ModalHeader>Edit Qaa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditQaaForm
            qaa={qaaSelected}
            editQaa={(data: any) => {
              editQaa(data);
              setIsOpenEditQaaModal(false);
            }}
          />
        </ModalBody>
      </CustomModal>
    </Box>
  );
};

export default QaaList;
