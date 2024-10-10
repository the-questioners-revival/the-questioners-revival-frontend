import useAbstractMutator from './AbstractMutator';
import TodoScheduleApi from '../api/todoSchedule';

export default function TodoScheduleProvider() {
  const {
    data: createTodoScheduleData,
    mutate: createTodoSchedule,
  }: { data: any; mutate: Function } = useAbstractMutator(
    TodoScheduleApi.createTodoSchedule,
  );

  return {
    createTodoScheduleData,
    createTodoSchedule,
  };
}
