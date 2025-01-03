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
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import { useState } from 'react';
import CustomModal from '../custom/CustomModal';
import EditTodoForm from './EditTodoForm';
import TodoListItem from './TodoListItem';
import { todoPriorityOptions, todoTypeOptions } from './CreateTodoForm';

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

export const limitOptions = [
  {
    name: '10',
    value: 10,
  },
  {
    name: '50',
    value: 50,
  },
  {
    name: '100',
    value: 100,
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
  priority,
  setPriority,
  createBlog,
  editBlog,
  createTodoSchedule,
  limit,
  setLimit,
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
  priority?: string;
  setPriority: Function;
  createBlog: Function;
  editBlog: Function;
  createTodoSchedule: Function;
  limit?: number;
  setLimit?: Function;
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
            value={priority}
            onChange={(evt) => setPriority && setPriority(evt.target.value)}
            placeholder="Priority"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {todoPriorityOptions?.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(evt) => setStatus && setStatus(evt.target.value)}
            placeholder="Status"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {statusOptions?.map((option) => (
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
            {todoTypeOptions?.map((option) => (
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
      <Text>Number of todos: {todos?.length}</Text>

      {todos?.map((todo: any, index: number) => (
        <TodoListItem
          key={'todo' + index}
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
          createBlog={createBlog}
          editBlog={editBlog}
          createTodoSchedule={createTodoSchedule}
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
