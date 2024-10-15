import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, VStack, Heading, Tooltip } from '@chakra-ui/react';
import {
  eachDayOfInterval,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getYear,
  getMonth,
} from 'date-fns';
import ActivityCalendarProvider from '../../providers/ActivityCalendarProvider';
import GithubProvider from '../../providers/GithubProvider';
import ProtectedPage from '../ProtectedPage';
import CustomLayout from '../layout/CustomLayout';

interface Activity {
  todos?: number;
  qaas?: number;
  blogs?: number;
  goals?: number;
  habits?: number;
  total?: number;
  github?: number;
}

interface ActivityData {
  days: {
    [date: string]: Activity;
  };
  months: { [month: string]: Activity };
  years: { [year: string]: Activity };
}

const getDayColor = (activityCount: number): string => {
  if (activityCount > 20) return 'green.600';
  if (activityCount > 10) return 'green.400';
  if (activityCount > 5) return 'green.200';
  if (activityCount > 0) return 'green.100';
  return 'gray.100';
};

const getMonthColor = (activityCount: number): string => {
  if (activityCount > 250) return 'green.600';
  if (activityCount > 100) return 'green.400';
  if (activityCount > 50) return 'green.200';
  if (activityCount > 0) return 'green.100';
  return 'gray.100';
};

const getYearColor = (activityCount: number): string => {
  if (activityCount > 1800) return 'green.600'; // Maximum threshold
  if (activityCount > 1000) return 'green.400';
  if (activityCount > 500) return 'green.200';
  if (activityCount > 0) return 'green.100';
  return 'gray.100'; // No activity
};

const ActivityCalendarPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData>({
    days: {},
    months: {},
    years: {},
  });
  const [contributions, setContributions] = useState<[] | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the selected date
  const {
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getMonthlyActivityCountsData,
    getMonthlyActivityCounts,
    getYearlyActivityCountsData,
    getYearlyActivityCounts,
  } = ActivityCalendarProvider();

  const { fetchGitHubContributionsData, fetchGitHubContributions } =
    GithubProvider();

  useEffect(() => {
    getDailyActivityCounts();
    getMonthlyActivityCounts();
    getYearlyActivityCounts();
  }, []);

  useEffect(() => {
    if (getDailyActivityCountsData) {
      setActivityData((prevState) => ({
        ...prevState,
        days: getDailyActivityCountsData,
      }));
    }
  }, [getDailyActivityCountsData]);

  useEffect(() => {
    if (getMonthlyActivityCountsData) {
      setActivityData((prevState) => ({
        ...prevState,
        months: getMonthlyActivityCountsData,
      }));
    }
  }, [getMonthlyActivityCountsData]);

  useEffect(() => {
    if (getYearlyActivityCountsData) {
      setActivityData((prevState) => ({
        ...prevState,
        years: getYearlyActivityCountsData,
      }));
    }
  }, [getYearlyActivityCountsData]);

  const allDays = eachDayOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  useEffect(() => {
    if (getDailyActivityCountsData) {
      fetchGitHubContributions();
    }
  }, [getDailyActivityCountsData]);

  useEffect(() => {
    if (fetchGitHubContributionsData) {
      setContributions(fetchGitHubContributionsData);
    }
  }, [fetchGitHubContributionsData]);

  useEffect(() => {
    if (contributions) {
      // Initialize new aggregation objects
      const newDays: { [key: string]: Activity } = { ...activityData.days };
      const newMonths: { [key: string]: Activity } = { ...activityData.months };
      const newYears: { [key: string]: Activity } = { ...activityData.years };

      contributions.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          const formattedDate = day.date; // Full date for daily data
          const formattedMonth = day.date.slice(0, 7); // 'YYYY-MM' for monthly data
          const formattedYear = day.date.slice(0, 4); // 'YYYY' for yearly data

          // Daily aggregation
          newDays[formattedDate] = {
            ...newDays[formattedDate],
            github:
              (newDays[formattedDate]?.github || 0) +
              (day.contributionCount || 0),
          };

          // Monthly aggregation
          newMonths[formattedMonth] = {
            ...newMonths[formattedMonth],
            github:
              (newMonths[formattedMonth]?.github || 0) +
              (day.contributionCount || 0),
          };

          // Yearly aggregation
          newYears[formattedYear] = {
            ...newYears[formattedYear],
            github:
              (newYears[formattedYear]?.github || 0) +
              (day.contributionCount || 0),
          };
        });
      });
      // Update the activity data state with new aggregated data
      setActivityData((prevData) => {
        return {
          days: { ...prevData.days, ...newDays },
          months: { ...prevData.months, ...newMonths },
          years: { ...prevData.years, ...newYears },
        };
      });
    }
  }, [contributions]);

  const allMonths = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  const allYears = Array.from(
    { length: 10 },
    (_, i) => getYear(new Date()) - 9 + i,
  );
  const today = format(new Date(), 'yyyy-MM-dd');

  const handleMouseEnter = (formattedDate: any) => {
    timeoutRef.current = setTimeout(() => {
      setSelectedDate(formattedDate);
    }, 500);
  };

  const handleMouseLeave = () => {
    setSelectedDate(null);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  function renderTooltipDetails(type: keyof ActivityData) {
    if (!selectedDate) {
      return null; // Return null if no date is selected
    }

    // Access the appropriate activity data for the selected date
    const activityForDate = activityData[type][selectedDate]; // Use the type to access the correct data

    return (
      <VStack spacing={0} alignItems="flex-start">
        <Box>
          <strong>Todos:</strong> {activityForDate?.todos || 0}
        </Box>
        <Box>
          <strong>Qaas:</strong> {activityForDate?.qaas || 0}
        </Box>
        <Box>
          <strong>Blogs:</strong> {activityForDate?.blogs || 0}
        </Box>
        <Box>
          <strong>Goals:</strong> {activityForDate?.goals || 0}
        </Box>
        <Box>
          <strong>Habits:</strong> {activityForDate?.habits || 0}
        </Box>
        <Box>
          <strong>Total:</strong> {activityForDate?.total || 0}
        </Box>
        <Box>
          <strong>GitHub:</strong> {activityForDate?.github || 0}
        </Box>
      </VStack>
    );
  }

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box paddingY="20px">
          <VStack spacing={8}>
            <Heading size="lg">Daily Activity</Heading>
            <Grid templateColumns="repeat(7, 1fr)" gap={1}>
              {allDays.map((day, index) => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const formattedDateLabel = format(day, 'yyyy MMMM dd');
                const activityCount =
                  activityData.days[formattedDate]?.total || 0;
                const isToday = formattedDate === today;
                const tooltipLabel = isToday
                  ? `${formattedDateLabel} (today) - ${activityCount} contributions`
                  : `${formattedDateLabel} - ${activityCount} contributions`;

                return (
                  <Tooltip
                    label={
                      <>
                        <Box>{tooltipLabel}</Box>
                        {renderTooltipDetails('days')}
                      </>
                    }
                    key={index}
                    placement="top"
                    hasArrow
                  >
                    <Box
                      width="20px"
                      height="20px"
                      bg={getDayColor(activityCount)} // Check if it's today
                      borderRadius="md"
                      border={isToday ? '2px solid black' : ''}
                      cursor="pointer" // Indicate that the box is clickable
                      onMouseEnter={() => handleMouseEnter(formattedDate)}
                      onMouseLeave={() => handleMouseLeave()}
                    />
                  </Tooltip>
                );
              })}
            </Grid>

            <Heading size="lg">Monthly Activity</Heading>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}>
              {allMonths.map((month, index) => {
                const formattedMonth = format(month, 'yyyy-MM');
                const formattedMonthLabel = format(month, 'yyyy MMMM');
                const isMonth = getMonth(formattedMonth) === getMonth(today);
                const activityCount =
                  activityData?.months[formattedMonth]?.total || 0;
                const tooltipLabel = `${formattedMonthLabel} - ${activityCount} contributions`;

                return (
                  <Tooltip
                    label={
                      <>
                        <Box>{tooltipLabel}</Box>
                        {renderTooltipDetails('months')}
                      </>
                    }
                    key={index}
                    placement="top"
                  >
                    <Box
                      width="30px"
                      height="30px"
                      bg={getMonthColor(activityCount)} // No need to check for today here
                      borderRadius="md"
                      border={isMonth ? '2px solid black' : ''}
                      onMouseEnter={() => handleMouseEnter(formattedMonth)}
                      onMouseLeave={() => handleMouseLeave()}
                    />
                  </Tooltip>
                );
              })}
            </Grid>

            <Heading size="lg">Yearly Activity</Heading>
            <Grid templateColumns="repeat(10, 1fr)" gap={2}>
              {allYears.map((year, index) => {
                const activityCount = activityData?.years[year]?.total || 0; // Get total for the year
                const tooltipLabel = `${year} - ${activityCount} contributions`; // Tooltip text
                const isYear = year === getYear(today);

                return (
                  <Tooltip
                    label={
                      <>
                        <Box>{tooltipLabel}</Box>
                        {renderTooltipDetails('years')}{' '}
                        {/* Call renderTooltipDetails with 'years' */}
                      </>
                    }
                    key={index}
                    placement="top"
                  >
                    <Box
                      width="40px"
                      height="40px"
                      bg={getYearColor(activityCount)} // Function to determine color for the year
                      borderRadius="md"
                      border={isYear ? '2px solid black' : ''}
                      onMouseEnter={() => handleMouseEnter(year)} // Handle mouse enter event
                      onMouseLeave={() => handleMouseLeave()} // Handle mouse leave event
                    />
                  </Tooltip>
                );
              })}
            </Grid>
          </VStack>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

// // Mock data generator function with type definitions
// const generateMockActivityData = (): ActivityData => {
//   const randomValue = () => Math.floor(Math.random() * 30); // Random values between 0 and 29

//   const data: ActivityData = {
//     days: {},
//     months: {},
//     years: {},
//   };

//   const currentDate = new Date();

//   // Generate random daily activity data
//   for (let i = 0; i < 100; i++) {
//     const randomDay = new Date(
//       currentDate.getFullYear(),
//       Math.floor(Math.random() * 12),
//       Math.floor(Math.random() * 28) + 1,
//     );
//     const formattedDate = format(randomDay, 'yyyy-MM-dd');
//     data.days[formattedDate] = randomValue();
//   }

//   // Generate random monthly activity data
//   for (let i = 0; i < 12; i++) {
//     const randomMonth = new Date(currentDate.getFullYear(), i, 1);
//     const formattedMonth = format(randomMonth, 'yyyy-MM');
//     data.months[formattedMonth] = randomValue();
//   }

//   // Generate random yearly activity data
//   for (let i = 0; i < 10; i++) {
//     const year = getYear(currentDate) - 9 + i;
//     data.years[year.toString()] = randomValue();
//   }

//   return data;
// };

export default ActivityCalendarPage;
