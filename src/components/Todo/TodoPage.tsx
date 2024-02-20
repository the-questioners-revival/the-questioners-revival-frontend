import CreateTodoForm from './CreateTodoForm';
import { Box } from '@chakra-ui/react';
import TodoList from './TodoList';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import TodosProvider from '../../providers/TodosProvider';

const TodoPage = () => {
  const [status, setStatus] = useState('inprogress');
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const {
    todoData,
    todoRefetch,
    createTodo,
    createTodoData,
    removeTodoData,
    removeTodo,
    editTodoData,
    editTodo,
    inprogressTodoData,
    inprogressTodo,
    completeTodoData,
    completeTodo,
  } = TodosProvider();

  useEffect(() => {
    todoRefetch({ type, status, priority });
  }, [type, status, priority]);

  useEffect(() => {
    if (
      completeTodoData ||
      inprogressTodoData ||
      createTodoData ||
      removeTodoData ||
      editTodoData
    ) {
      todoRefetch({ type, status, priority });
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
            todos={todoData}
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
