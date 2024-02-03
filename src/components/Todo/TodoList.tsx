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
import { TODO_STATUS } from '../../enums/todo-status';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import { useRef, useState } from 'react';
import CustomModal from '../custom/CustomModal';
import EditTodoForm from './EditTodoForm';

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
  const modalRef = useRef<any>();
  const editModalRef = useRef<any>();
  const [todoSelected, setTodoSelected] = useState<any>();
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="10px"
          border="2px solid white"
          borderRadius="10"
          _hover={{ cursor: 'pointer' }}
        >
          <Box
            display="flex"
            alignItems="center"
            w="100%"
            onClick={() =>
              todo.status === TODO_STATUS.COMPLETED ||
              todo.status === TODO_STATUS.REMOVED
                ? inprogressTodo(todo?.id)
                : completeTodo(todo?.id)
            }
            padding="5px 10px"
          >
            {/* <CheckIcon w={4} h={4} color="black" /> */}
            <Text
              fontSize="lg"
              paddingRight="7px"
              textDecorationLine={`${
                todo.status === TODO_STATUS.COMPLETED ? 'line-through' : ''
              }`}
            >
              {todo.title}
            </Text>
            <Tag>{todo.type}</Tag>
          </Box>
          <Flex padding="5px 10px">
            <EditIcon
              w={4}
              h={4}
              marginRight="10px"
              color="white"
              onClick={() => {
                editModalRef?.current?.isOpen
                  ? editModalRef?.current?.closeModal()
                  : editModalRef?.current?.openModal();
                setTodoSelected(todo);
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
                setTodoSelected(todo);
              }}
            />
          </Flex>
        </Box>
      ))}
      <CustomConfirmationModal
        ref={modalRef as any}
        primaryAction={() => {
          removeTodo(todoSelected?.id);
          modalRef?.current?.closeModal();
        }}
        secondaryAction={() => {}}
        title={`Remove todo`}
        description={`Are you sure you want to remove todo with id ${todoSelected?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
      <CustomModal ref={editModalRef as any}>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditTodoForm
            todo={todoSelected}
            editTodo={(data: any) => {
              editTodo(data);
              editModalRef?.current?.closeModal();
            }}
          />
        </ModalBody>
      </CustomModal>
    </Box>
  );
};

export default TodoList;
