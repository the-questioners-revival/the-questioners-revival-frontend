import useAbstractProvider from '../../providers/AbstractProvider';
import CreateTodoForm from './CreateTodoForm';
import TodoApi from '../../api/todo';
import { Box } from '@chakra-ui/react';
import TodoList from './TodoList';
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';

const TodoPage = () => {
  const [status, setStatus] = useState('inprogress');
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const { data, refetch }: { data: any; refetch: Function } =
    useAbstractProvider(TodoApi.getLatestTodos, { type, status, priority });
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

  const {
    data: editTodoData,
    mutate: editTodo,
  }: { data: any; mutate: Function } = useAbstractMutator(TodoApi.editTodo);

  useEffect(() => {
    refetch({ type, status, priority });
  }, [type, status, priority]);

  useEffect(() => {
    if (
      completeTodoData ||
      inprogressTodoData ||
      createTodoData ||
      removeTodoData ||
      editTodoData
    ) {
      refetch({ type, status, priority });
    }
  }, [
    completeTodoData,
    inprogressTodoData,
    createTodoData,
    removeTodoData,
    editTodoData,
  ]);

  return (
    <ProtectedPage>
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
            editTodo={editTodo}
            priority={priority}
            setPriority={setPriority}
          ></TodoList>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default TodoPage;
