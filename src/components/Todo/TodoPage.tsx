import useAbstractProvider from '../../providers/AbstractProvider';
import CreateTodoForm from './CreateTodoForm';
import TodoApi from '../../api/todo';
import { Box, Heading } from '@chakra-ui/react';
import TodoList from './TodoList';
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/Layout';

const TodoPage = () => {
  const [status, setStatus] = useState('inprogress');
  const [type, setType] = useState();
  const { data, refetch }: { data: any; refetch: Function } =
    useAbstractProvider(TodoApi.getLatestTodos);
  const {
    data: completeTodoData,
    mutate: completeTodo,
  }: { data: any; mutate: Function } = useAbstractMutator(TodoApi.completeTodo);

  const {
    data: inprogressTodoData,
    mutate: inprogressTodo,
  }: { data: any; mutate: Function } = useAbstractMutator(
    TodoApi.inprogressTodo,
  );

  const {
    data: createTodoData,
    mutate: createTodo,
  }: { data: any; mutate: Function } = useAbstractMutator(TodoApi.createTodo);

  const {
    data: removeTodoData,
    mutate: removeTodo,
  }: { data: any; mutate: Function } = useAbstractMutator(TodoApi.removeTodo);

  useEffect(() => {
    refetch({ type, status });
  }, [type, status]);

  useEffect(() => {
    if (
      completeTodoData ||
      inprogressTodoData ||
      createTodoData ||
      removeTodoData
    ) {
      refetch({ type, status });
    }
  }, [completeTodoData, inprogressTodoData, createTodoData, removeTodoData]);

  return (
    <CustomLayout>
      <Box paddingTop="20px">
        <CreateTodoForm createTodo={createTodo} />
        <TodoList
          todos={data}
          completeTodo={completeTodo}
          inprogressTodo={inprogressTodo}
          removeTodo={removeTodo}
          status={status}
          setStatus={setStatus}
          type={type}
          setType={setType}
        ></TodoList>
      </Box>
    </CustomLayout>
  );
};

export default TodoPage;
