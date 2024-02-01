import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';

const TodoList = ({
  todos,
  completeTodo,
  inprogressTodo,
  removeTodo,
}: {
  todos: any;
  completeTodo: Function;
  inprogressTodo: Function;
  removeTodo: Function;
}) => {
  return (
    <Box paddingTop="15px">
      <Heading as="h2" size="lg">
        Todos
      </Heading>
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
