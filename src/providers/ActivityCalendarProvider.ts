import ActivityCalendarApi from '../api/activityCalendar';
import useAbstractProvider from './AbstractProvider';

export default function ActivityCalendarProvider() {
  const {
    data: getDailyActivityCountsData,
    refetch: getDailyActivityCounts,
    loading: getDailyActivityCountsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    ActivityCalendarApi.getDailyActivityCounts,
    null,
    false,
  );

  return {
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getDailyActivityCountsLoading,
  };
}
