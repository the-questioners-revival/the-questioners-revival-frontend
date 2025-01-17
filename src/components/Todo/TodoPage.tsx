import CreateTodoForm from './CreateTodoForm';
import { Box } from '@chakra-ui/react';
import TodoList from './TodoList';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [limit, setLimit] = useState<any>('');
  console.log('limit: ', limit);
  const [offset, setOffset] = useState(0);
  const [todos, setTodos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { setLoading: setGlobalLoading } = useFloatingLoader();

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const fetchTodos = useCallback(
    (reset: boolean = false) => {
      if (!loading) {
        setLoading(true);
        console.log('offset: ', offset);
        getLatestTodosRefetch({
          type,
          status,
          priority,
          limit,
          offset: reset ? 0 : offset,
        });
        setOffset(reset ? parseInt(limit,10) : parseInt(limit,10) + offset);
      }
    },
    [type, status, priority, limit, offset, getLatestTodosRefetch, loading],
  );

  const { createBlog, editBlog, createBlogData, editBlogData } =
    BlogsProvider();

  const { createTodoSchedule, createTodoScheduleData } = TodoScheduleProvider();
  console.log("createTodoScheduleData", createTodoScheduleData);

  useEffect(() => {
    fetchTodos(true);
    setTodos([]);
  }, [type, status, priority, limit]);

  useEffect(() => {
    if (getLatestTodosData) {
      setTodos((prevTodos: any) => [...prevTodos, ...getLatestTodosData]);
      setLoading(false);
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
      editBlogData ||
    createTodoScheduleData
    ) {
      fetchTodos(true);
      setTodos([]);
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
    setGlobalLoading(getLatestTodosLoading);
  }, [getLatestTodosLoading, setGlobalLoading]);

  const handleScroll = useCallback(() => {
    if (limit === '') return;
    if (todos.length === 0 || loading) return;

    const isBottomOfPage =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 50;

    if (isBottomOfPage) {
      setOffset((prevOffset) => prevOffset + parseInt(limit, 10));
      fetchTodos();
    }
  }, [todos.length, fetchTodos, limit, loading]);

  useEffect(() => {
    const debouncedScrollHandler = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [handleScroll]);

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
            limit={limit}
            setLimit={setLimit}
          ></TodoList>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default TodoPage;
