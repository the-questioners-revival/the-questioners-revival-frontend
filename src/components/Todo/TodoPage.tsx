import CreateTodoForm from './CreateTodoForm';
import { Box } from '@chakra-ui/react';
import TodoList from './TodoList';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import TodosProvider from '../../providers/TodosProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';
import BlogsProvider from '../../providers/BlogsProvider';
import TodoScheduleProvider from '../../providers/TodoScheduleProvider';

const TodoPage = () => {
  const [status, setStatus] = useState('inprogress');
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const { setLoading } = useFloatingLoader();
  const [offset, setOffset] = useState(0);
  const [todos, setTodos] = useState<any>([]);
  const limit = 10;
  console.log('offset: ', offset);

  const {
    getLatestTodosData,
    getLatestTodosRefetch,
    getLatestTodosLoading,
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

  const { createBlog, editBlog, createBlogData, editBlogData } =
    BlogsProvider();

  const { createTodoSchedule, createTodoScheduleData } = TodoScheduleProvider();

  useEffect(() => {
      getLatestTodosRefetch({ type, status, priority, limit, offset: 0 });
      setTodos([]);
      setOffset(limit);
  }, [type, status, priority]);

  useEffect(() => {
    if (getLatestTodosData) {
      setTodos((prevTodos: any) => [...prevTodos, ...getLatestTodosData]);
    }
  }, [getLatestTodosData]);

  useEffect(() => {
    if (
      completeTodoData ||
      inprogressTodoData ||
      createTodoData ||
      removeTodoData ||
      editTodoData ||
      createBlogData ||
      editBlogData
    ) {
      getLatestTodosRefetch({ type, status, priority, limit, offset });
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [
    completeTodoData,
    inprogressTodoData,
    createTodoData,
    removeTodoData,
    editTodoData,
    createBlogData,
    editBlogData,
    createTodoScheduleData,
  ]);

  useEffect(() => {
    setLoading(getLatestTodosLoading);
  }, [getLatestTodosLoading]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      getLatestTodosLoading
    ) {
      return;
    }
    getLatestTodosRefetch({ type, status, priority, limit, offset });
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getLatestTodosLoading]);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <CreateTodoForm createTodo={createTodo} />
          <TodoList
            todos={todos}
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
            createBlog={createBlog}
            editBlog={editBlog}
            createTodoSchedule={createTodoSchedule}
          ></TodoList>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default TodoPage;
