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
    data: getWeeklyActivityCountsData,
    refetch: getWeeklyActivityCounts,
    loading: getWeeklyActivityCountsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    ActivityCalendarApi.getWeeklyActivityCounts,
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

  const {
    data: getYearlyActivityCountsData,
    refetch: getYearlyActivityCounts,
    loading: getYearlyActivityCountsLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    ActivityCalendarApi.getYearlyActivityCounts,
    null,
    false,
  );

  return {
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getDailyActivityCountsLoading,
    getWeeklyActivityCountsData,
    getWeeklyActivityCounts,
    getWeeklyActivityCountsLoading,
    getMonthlyActivityCountsData,
    getMonthlyActivityCounts,
    getMonthlyActivityCountsLoading,
    getYearlyActivityCountsData,
    getYearlyActivityCounts,
    getYearlyActivityCountsLoading,
  };
}
