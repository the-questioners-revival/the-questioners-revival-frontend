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

  const {
    data: getMonthlyActivityCountsData,
    refetch: getMonthlyActivityCounts,
    loading: getMonthlyActivityCountsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    ActivityCalendarApi.getMonthlyActivityCounts,
    null,
    false,
  );

  return {
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getDailyActivityCountsLoading,
    getMonthlyActivityCountsData,
    getMonthlyActivityCounts,
    getMonthlyActivityCountsLoading,
  };
}
