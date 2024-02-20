import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import HabitsTrackerApi from '../api/habitsTracker';

export default function HabitsTrackerProvider() {
  const {
    data: habitsTrackers,
    refetch: getHabitsTrackersFromTo,
    loading: getHabitsTrackersFromToLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    HabitsTrackerApi.getHabitsTrackersFromTo,
    null,
    false,
  );

  const {
    data: createHabitsTrackerData,
    mutate: createHabitsTracker,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsTrackerApi.createHabitsTracker,
  );

  const {
    data: deleteHabitsTrackerData,
    mutate: deleteHabitsTracker,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsTrackerApi.deleteHabitsTracker,
  );

  const {
    data: getDailyHabitsTrackersData,
    refetch: getDailyHabitsTrackers,
    loading: getDailyHabitsTrackersLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    HabitsTrackerApi.getDailyHabitsTrackers,
  );

  return {
    habitsTrackers,
    getHabitsTrackersFromTo,
    getHabitsTrackersFromToLoading,
    createHabitsTrackerData,
    createHabitsTracker,
    deleteHabitsTrackerData,
    deleteHabitsTracker,
    getDailyHabitsTrackersData,
    getDailyHabitsTrackers,
    getDailyHabitsTrackersLoading,
  };
}
