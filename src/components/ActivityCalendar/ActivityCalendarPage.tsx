import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, VStack, Heading, Tooltip } from '@chakra-ui/react';
import {
  eachDayOfInterval,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getYear,
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
  habits_trackers?: number;
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

// Function to determine the color based on activity level
const getDayColor = (activityCount: number, isToday: boolean): string => {
  if (isToday) return 'blue.400'; // Highlight today in blue
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
  const [contributions, setContributions] = useState<[] | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the selected date
  const { getDailyActivityCountsData, getDailyActivityCounts } =
    ActivityCalendarProvider();

  const { fetchGitHubContributionsData, fetchGitHubContributions } =
    GithubProvider();

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
    console.log('fetchGitHubContributionsData: ', fetchGitHubContributionsData);
    if (fetchGitHubContributionsData) {
      setContributions(fetchGitHubContributionsData);
    }
  }, [fetchGitHubContributionsData]);

  useEffect(() => {
    if (contributions) {
      const newActivityData = { ...activityData };
      contributions?.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          const formattedDate = day.date;

          if (!newActivityData.days[formattedDate]) {
            newActivityData.days[formattedDate] = {
              github: 0,
            };
          }
          newActivityData.days[formattedDate].github = day.contributionCount;
        });
        setActivityData((prevData) => ({
          ...prevData,
          ...newActivityData,
        }));
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
  ); // Generate the last 10 years

  const today = format(new Date(), 'yyyy-MM-dd');

  const handleMouseEnter = (formattedDate: any) => {
    console.log('handleMouseEnter');
    timeoutRef.current = setTimeout(() => {
      console.log('Setting selected date');
      setSelectedDate(formattedDate);
    }, 1000);
  };

  const handleMouseLeave = () => {
    console.log('Removing timeout');
    setSelectedDate(null);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <ProtectedPage>
      <CustomLayout>
        <VStack spacing={8}>
          <Heading size="md">Daily Activity</Heading>
          <Grid templateColumns="repeat(7, 1fr)" gap={1}>
            {allDays.map((day, index) => {
              const formattedDate = format(day, 'yyyy-MM-dd');
              const activityCount =
                activityData.days[formattedDate]?.total || 0;
              const isToday = formattedDate === today;
              const tooltipLabel = isToday
                ? `${formattedDate} (today) - ${activityCount} contributions`
                : `${formattedDate} - ${activityCount} contributions`;

              return (
                <Tooltip
                  label={
                    <>
                      <Box>{tooltipLabel}</Box>
                      {selectedDate ? (
                        <VStack spacing={0} alignItems="flex-start">
                          <Box>
                            <strong>Todos:</strong>{' '}
                            {activityData.days[selectedDate]?.todos}
                          </Box>
                          <Box>
                            <strong>Qaas:</strong>{' '}
                            {activityData.days[selectedDate]?.qaas}
                          </Box>
                          <Box>
                            <strong>Blogs:</strong>{' '}
                            {activityData.days[selectedDate]?.blogs}
                          </Box>
                          <Box>
                            <strong>Goals:</strong>{' '}
                            {activityData.days[selectedDate]?.goals}
                          </Box>
                          <Box>
                            <strong>Habits:</strong>{' '}
                            {activityData.days[selectedDate]?.habits_trackers}
                          </Box>
                          <Box>
                            <strong>Total:</strong>{' '}
                            {activityData.days[selectedDate]?.total}
                          </Box>
                          <Box>
                            <strong>GitHub:</strong>{' '}
                            {activityData.days[selectedDate]?.github}
                          </Box>
                        </VStack>
                      ) : null}
                    </>
                  }
                  key={index}
                  placement="top"
                  hasArrow
                >
                  <Box
                    width="20px"
                    height="20px"
                    bg={getDayColor(activityCount, isToday)} // Check if it's today
                    borderRadius="md"
                    cursor="pointer" // Indicate that the box is clickable
                    onMouseEnter={() => handleMouseEnter(formattedDate)}
                    onMouseLeave={() => handleMouseLeave()}
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
