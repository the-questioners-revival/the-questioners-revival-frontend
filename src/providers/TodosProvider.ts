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

  return {
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
  };
}
