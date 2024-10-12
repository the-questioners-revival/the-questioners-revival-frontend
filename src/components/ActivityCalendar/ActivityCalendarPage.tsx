import React, { useEffect, useState } from 'react';
import { Box, Grid, VStack, Heading, Tooltip } from '@chakra-ui/react';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  startOfYear,
  endOfYear,
  getYear,
} from 'date-fns';
import ActivityCalendarProvider from '../../providers/ActivityCalendarProvider';

interface Activity {
  todos: number;
  qaas: number;
  blogs: number;
  goals: number;
  habits_trackers: number;
  total: number;
}
interface ActivityData {
  days: {
    [date: string]: Activity;
  };
  months: { [month: string]: Activity };
  years: { [year: string]: Activity };
}

// Function to determine the color based on activity level
const getDayColor = (activityCount: number, isToday: boolean): string => {
  if (isToday) return 'blue.400'; // Highlight today in red
  if (activityCount > 20) return 'green.600';
  if (activityCount > 10) return 'green.400';
  if (activityCount > 5) return 'green.200';
  if (activityCount > 0) return 'green.100';
  return 'gray.100';
};

const ActivityCalendarPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData>({
    days: {},
    months: {},
    years: {},
  });
  console.log('activityData: ', activityData);
  const { getDailyActivityCountsData, getDailyActivityCounts } =
    ActivityCalendarProvider();

  useEffect(() => {
    getDailyActivityCounts();
  }, []);

  useEffect(() => {
    if (getDailyActivityCountsData) {
      const data = {
        days: getDailyActivityCountsData,
        months: {},
        years: {},
      };
      setActivityData(data);
    }
  }, [getDailyActivityCountsData]);

  // Generate all days and months of the current year
  const allDays = eachDayOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  const allMonths = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  const allYears = Array.from(
    { length: 10 },
    (_, i) => getYear(new Date()) - 9 + i,
  ); // Generate the last 10 years

  const today = format(new Date(), 'yyyy-MM-dd'); // Get today's date in 'yyyy-MM-dd' format

  return (
    <VStack spacing={8}>
      <Heading size="md">Daily Activity</Heading>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {allDays.map((day, index) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const activityCount = activityData.days[formattedDate]?.total || 0;
          const isToday = formattedDate === today;
          const tooltipLabel = isToday
            ? `${formattedDate} (today) - ${activityCount} contributions`
            : `${formattedDate} - ${activityCount} contributions`;

          return (
            <Tooltip label={tooltipLabel} key={index} placement="top">
              <Box
                width="20px"
                height="20px"
                bg={getDayColor(activityCount, isToday)} // Check if it's today
                borderRadius="md"
              />
            </Tooltip>
          );
        })}
      </Grid>

      {/* <Heading size="md">Monthly Activity</Heading>
      <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        {allMonths.map((month, index) => {
          const formattedMonth = format(month, 'yyyy-MM');
          const activityCount = activityData?.months[formattedMonth] || 0;
          const tooltipLabel = `${formattedMonth} - ${activityCount} contributions`;

          return (
            <Tooltip label={tooltipLabel} key={index} placement="top">
              <Box
                width="30px"
                height="30px"
                bg={getDayColor(activityCount, false)} // No need to check for today here
                borderRadius="md"
              />
            </Tooltip>
          );
        })}
      </Grid>

      <Heading size="md">Yearly Activity</Heading>
      <Grid templateColumns="repeat(10, 1fr)" gap={2}>
        {allYears.map((year, index) => {
          const activityCount = activityData?.years[year.toString()] || 0;
          const tooltipLabel = `${year} - ${activityCount} contributions`;

          return (
            <Tooltip label={tooltipLabel} key={index} placement="top">
              <Box
                width="40px"
                height="40px"
                bg={getDayColor(activityCount, false)} // No need to check for today here
                borderRadius="md"
              />
            </Tooltip>
          );
        })}
      </Grid> */}
    </VStack>
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
