import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import HabitsTrackerApi from '../api/habitsTracker';

export default function HabitsTrackerProvider() {
  const {
    data: habitsTrackers,
    refetch: getHabitsTrackersFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
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
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsTrackerApi.getDailyHabitsTrackers,
  );

  return {
    habitsTrackers,
    getHabitsTrackersFromTo,
    createHabitsTrackerData,
    createHabitsTracker,
    deleteHabitsTrackerData,
    deleteHabitsTracker,
    getDailyHabitsTrackersData,
    getDailyHabitsTrackers,
  };
}
