import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Select, Tag, Text } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';

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
}: {
  todos: any;
  completeTodo: Function;
  inprogressTodo: Function;
  removeTodo: Function;
  status?: string;
  setStatus?: Function;
  type?: string;
  setType?: Function;
}) => {
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
          <Box padding="5px 10px">
            <CloseIcon
              w={4}
              h={4}
              color="white"
              onClick={() => removeTodo(todo?.id)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;
