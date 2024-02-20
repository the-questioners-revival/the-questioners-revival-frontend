import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import HabitsApi from '../api/habit';

export default function HabitsProvider() {
  const {
    data: habitsData,
    refetch: getLatestHabits,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsApi.getLatestHabits,
  );

  const {
    data: createHabitData,
    mutate: createHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsApi.createHabit,
  );

  const {
    data: editHabitData,
    mutate: editHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(HabitsApi.editHabit);

  const {
    data: deleteHabitData,
    mutate: deleteHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsApi.removeHabit,
  );

  const {
    data: getDailyHabitsData,
    refetch: getDailyHabits,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsApi.getDailyHabits,
  );

  return {
    habitsData,
    getLatestHabits,
    createHabitData,
    createHabit,
    editHabitData,
    editHabit,
    deleteHabitData,
    deleteHabit,
    getDailyHabitsData,
    getDailyHabits
  };
}
