import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import GoalsApi from '../api/goal';

export default function GoalsProvider() {
  const {
    data: getGoalsFromToData,
    refetch: getGoalsFromTo,
    loading: getGoalsFromToLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    GoalsApi.getGoalsFromTo,
    null,
    false,
  );

  const {
    data: getAllGoalsGroupedByDateData,
    refetch: getAllGoalsGroupedByDate,
    loading: getAllGoalsGroupedByDateLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    GoalsApi.getAllGoalsGroupedByDate,
    null,
    false,
  );

  const {
    data: createGoalData,
    mutate: createGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.createGoal);

  const {
    data: editGoalData,
    mutate: editGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.editGoal);

  const {
    data: removeGoalData,
    mutate: removeGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.removeGoal);

  return {
    getGoalsFromToData,
    getGoalsFromTo,
    getGoalsFromToLoading,
    getAllGoalsGroupedByDateData,
    getAllGoalsGroupedByDateLoading,
    getAllGoalsGroupedByDate,
    createGoalData,
    createGoal,
    editGoalData,
    editGoal,
    removeGoalData,
    removeGoal,
  };
}
