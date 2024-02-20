import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import GoalsApi from '../api/goal';

export default function GoalsProvider() {
  const {
    data: getGoalsFromToData,
    refetch: getGoalsFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
    GoalsApi.getGoalsFromTo,
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
    createGoalData,
    createGoal,
    editGoalData,
    editGoal,
    removeGoalData,
    removeGoal,
  };
}
