import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Select,
  Tag,
  Text,
} from '@chakra-ui/react';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import { useState } from 'react';
import CustomModal from '../custom/CustomModal';
import EditTodoForm from './EditTodoForm';
import TodoListItem from './TodoListItem';

const statusOptions = [
  {
    name: 'in progress',
    value: 'inprogress',
  },
  {
    name: 'completed',
    value: 'completed',
  },
  {
    name: 'removed',
    value: 'removed',
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

const TodoList = ({
  todos,
  completeTodo,
  inprogressTodo,
  removeTodo,
  status,
  setStatus,
  type,
  setType,
  editTodo,
}: {
  todos: any;
  completeTodo: Function;
  inprogressTodo: Function;
  removeTodo: Function;
  status?: string;
  setStatus?: Function;
  type?: string;
  setType?: Function;
  editTodo: Function;
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<[Number?]>([]);
  const [todoSelected, setTodoSelected] = useState<any>();
  const [isOpenDeleteTodoModal, setIsOpenDeleteTodoModal] = useState(false);
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] = useState(false);

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
          Todos
        </Heading>
        <Flex>
          <Select
            value={status}
            onChange={(evt) => setStatus && setStatus(evt.target.value)}
            placeholder="Status"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {statusOptions?.map((option) => (
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
      <Text>Number of todos: {todos?.length}</Text>
      {todos?.map((todo: any) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          inprogressTodo={inprogressTodo}
          setTodoSelected={setTodoSelected}
          isOpenEditTodoModal={isOpenEditTodoModal}
          setIsOpenEditTodoModal={setIsOpenEditTodoModal}
          isOpenDeleteTodoModal={isOpenDeleteTodoModal}
          setIsOpenDeleteTodoModal={setIsOpenDeleteTodoModal}
          isOpenAnswer={selectedItemIds.includes(todo?.id)}
          openAnswer={handleItemClick}
        />
      ))}
      <CustomConfirmationModal
        primaryAction={() => {
          removeTodo(todoSelected?.id);
          setIsOpenDeleteTodoModal(false);
        }}
        secondaryAction={() => {}}
        title={`Remove todo`}
        description={`Are you sure you want to remove todo with id ${todoSelected?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
        isOpen={isOpenDeleteTodoModal}
        closeModal={() => setIsOpenDeleteTodoModal(false)}
      />
      <CustomModal
        isOpen={isOpenEditTodoModal}
        closeModal={() => setIsOpenEditTodoModal(false)}
      >
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditTodoForm
            todo={todoSelected}
            editTodo={(data: any) => {
              editTodo(data);
              setIsOpenEditTodoModal(false);
            }}
          />
        </ModalBody>
      </CustomModal>
    </Box>
  );
};

export default TodoList;
