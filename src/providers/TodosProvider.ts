import { useEffect, useMemo } from 'react';
import TodoApi from '../api/todo';
import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';

export default function TodosProvider() {
  const {
    data: todoData,
    refetch: todoRefetch,
    loading: getLatestTodosLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    TodoApi.getLatestTodos,
    null,
    false,
  );

  const {
    data: getAllTodosData,
    refetch: getAllTodos,
    loading: getAllTodosLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    TodoApi.getAllTodos,
    null,
    false,
  );

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

  const {
    data: getAllTodosGroupedByDateData,
    refetch: getAllTodosGroupedByDate,
    loading: getAllTodosGroupedByDateLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    TodoApi.getAllTodosGroupedByDate,
    null,
    false,
  );

  const {
    data: getDailyActivityCountsData,
    refetch: getDailyActivityCounts,
    loading: getDailyActivityCountsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    TodoApi.getDailyActivityCounts,
    null,
    false,
  );

  useEffect(() => {
    console.log('REFETCHING');
    const fetchTodos = async () => {
      getAllTodos();
    };

    fetchTodos();
  }, [createTodoData, removeTodoData]); // Call getAllTodos whenever it changes

  const todoOptions = useMemo(() => {
    return getAllTodosData?.map((todo: any) => ({
      name: todo.title,
      value: todo.id,
    }));
  }, [getAllTodosData]);
  console.log('todoOptions: ', todoOptions);

  return {
    todoOptions,
    todoData,
    todoRefetch,
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
    getAllTodosGroupedByDateData,
    getAllTodosGroupedByDate,
    getAllTodosGroupedByDateLoading,
    getAllTodosData,
    getAllTodos,
    getAllTodosLoading,
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getDailyActivityCountsLoading,
  };
}
