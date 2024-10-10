import useAbstractMutator from './AbstractMutator';
import TodoScheduleApi from '../api/todoSchedule';
import useAbstractProvider from './AbstractProvider';

export default function TodoScheduleProvider() {
  const {
    data: createTodoScheduleData,
    mutate: createTodoSchedule,
  }: { data: any; mutate: Function } = useAbstractMutator(
    TodoScheduleApi.createTodoSchedule,
  );

  const {
    data: getAllTodoSchedulesGroupedByDateData,
    refetch: getAllTodoSchedulesGroupedByDate,
    loading: getAllTodoSchedulesGroupedByDateLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    TodoScheduleApi.getAllTodoSchedulesGroupedByDate,
    null,
    false,
  );

  return {
    createTodoScheduleData,
    createTodoSchedule,
    getAllTodoSchedulesGroupedByDateData,
    getAllTodoSchedulesGroupedByDate,
    getAllTodoSchedulesGroupedByDateLoading,
  };
}
