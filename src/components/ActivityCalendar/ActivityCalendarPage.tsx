import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Grid,
  VStack,
  Heading,
  Tooltip,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  eachDayOfInterval,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getYear,
  getMonth,
  eachWeekOfInterval,
  getISOWeek,
  addDays,
  subDays,
  getDay,
} from "date-fns";
import ActivityCalendarProvider from "../../providers/ActivityCalendarProvider";
import GithubProvider from "../../providers/GithubProvider";
import ProtectedPage from "../ProtectedPage";
import CustomLayout from "../layout/CustomLayout";
import { DAY_NAMES } from "../../utils";

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
  weeks: { [week: string]: Activity };
  months: { [month: string]: Activity };
  years: { [year: string]: Activity };
}

const getDayColor = (activityCount: number): string => {
  if (activityCount > 20) return "green.600";
  if (activityCount > 10) return "green.400";
  if (activityCount > 5) return "green.200";
  if (activityCount > 0) return "green.100";
  return "gray.100";
};

const getWeekColor = (activityCount: number): string => {
  if (activityCount > 50) return "green.600"; // High activity
  if (activityCount > 20) return "green.400"; // Moderate activity
  if (activityCount > 10) return "green.200"; // Low activity
  if (activityCount > 0) return "green.100"; // Very low activity
  return "gray.100"; // No activity
};

const getMonthColor = (activityCount: number): string => {
  if (activityCount > 250) return "green.600";
  if (activityCount > 100) return "green.400";
  if (activityCount > 50) return "green.200";
  if (activityCount > 0) return "green.100";
  return "gray.100";
};

const getYearColor = (activityCount: number): string => {
  if (activityCount > 1800) return "green.600"; // Maximum threshold
  if (activityCount > 1000) return "green.400";
  if (activityCount > 500) return "green.200";
  if (activityCount > 0) return "green.100";
  return "gray.100"; // No activity
};

const ActivityCalendarPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData>({
    days: {},
    weeks: {},
    months: {},
    years: {},
  });
  const [contributions, setContributions] = useState<[] | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the selected date
  const [year, setYear] = useState(getYear(new Date()));

  const {
    getDailyActivityCountsData,
    getDailyActivityCounts,
    getWeeklyActivityCountsData,
    getWeeklyActivityCounts,
    getMonthlyActivityCountsData,
    getMonthlyActivityCounts,
    getYearlyActivityCountsData,
    getYearlyActivityCounts,
  } = ActivityCalendarProvider();

  const { fetchGitHubContributionsData, fetchGitHubContributions } =
    GithubProvider();

  useEffect(() => {
    getDailyActivityCounts();
    getWeeklyActivityCounts();
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
    if (getWeeklyActivityCountsData) {
      setActivityData((prevState) => ({
        ...prevState,
        weeks: getWeeklyActivityCountsData,
      }));
    }
  }, [getWeeklyActivityCountsData]);

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
      const newWeeks: { [key: string]: Activity } = { ...activityData.weeks };
      const newMonths: { [key: string]: Activity } = { ...activityData.months };
      const newYears: { [key: string]: Activity } = { ...activityData.years };

      const currentYear = new Date().getFullYear();

      contributions.forEach((week: any) => {
        week.contributionDays = week.contributionDays.filter((day: any) => {
          const year = new Date(day.date).getFullYear();
          return year === currentYear;
        });
      });

      contributions.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          const formattedDate = day.date; // Full date for daily data
          const formattedWeek = `${format(day.date, "yyyy")}-${format(day.date, "ww")}`;
          const formattedMonth = day.date.slice(0, 7); // 'YYYY-MM' for monthly data
          const formattedYear = day.date.slice(0, 4); // 'YYYY' for yearly data

          // Daily aggregation
          newDays[formattedDate] = {
            ...newDays[formattedDate],
            github:
              (newDays[formattedDate]?.github || 0) +
              (day.contributionCount || 0),
          };

          // Weekly aggregation
          newWeeks[formattedWeek] = {
            ...newWeeks[formattedWeek],
            github:
              (newWeeks[formattedWeek]?.github || 0) +
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
          weeks: { ...prevData.weeks, ...newWeeks },
          months: { ...prevData.months, ...newMonths },
          years: { ...prevData.years, ...newYears },
        };
      });
    }
  }, [contributions]);


  const allDays = useMemo(() => {
    const firstDayOfYear = startOfYear(new Date(year, 0, 1));
    const paddingDaysCount = (firstDayOfYear.getDay() + 6) % 7; // Get days to pad before the first Monday

    // Create an array of padding days
    const paddingDays = Array.from({ length: paddingDaysCount }, (_, i) =>
      subDays(firstDayOfYear, paddingDaysCount - i)
    );

    // Get all the days of the current year
    const yearDays = eachDayOfInterval({
      start: firstDayOfYear,
      end: endOfYear(new Date(year, 0, 1)),
    });

    // Combine padding days with the actual days
    return [...paddingDays, ...yearDays];
  }, [year]);


  const allWeeks = useMemo(() => {
    const startOfWeek = addDays(
      startOfYear(new Date(year, 0, 1)),
      (1 - startOfYear(new Date(year, 0, 1)).getDay() + 7) % 7,
    );

    const weeks = eachWeekOfInterval(
      {
        start: startOfWeek,
        end: endOfYear(new Date(year, 0, 1)),
      },
      { weekStartsOn: 1 },
    );

    weeks.sort((a, b) => getISOWeek(a) - getISOWeek(b));
    return weeks;
  }, [year]);

  const allMonths = useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(new Date(year, 0, 1)),
      end: endOfYear(new Date(year, 0, 1)),
    });
  }, [year]);

  const allYears = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => getYear(new Date()) - 9 + i);
  }, []);

  const today = format(new Date(), "yyyy-MM-dd");

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
            <Box display="flex" alignItems="center">
              <Button
                display="flex"
                colorScheme="teal"
                type="submit"
                onClick={() => {
                  // limit the year to ten years in the past
                  const currentYear = getYear(new Date());
                  const newYear =
                    year - 1 <= currentYear - 10 ? year : year - 1;
                  setYear(newYear);
                }}
              >
                Previous
              </Button>
              <Text fontSize="lg" paddingX="10px">
                Year {year}
              </Text>
              <Button
                display="flex"
                colorScheme="teal"
                type="submit"
                onClick={() => {
                  // limit the year to current year, no point in going in the future
                  const currentYear = getYear(new Date());
                  const newYear =
                    year + 1 > currentYear ? currentYear : year + 1;
                  setYear(newYear);
                }}
              >
                Next
              </Button>
            </Box>
            <Heading size="lg">Daily Activity</Heading>
            <Grid templateColumns="repeat(7, 1fr)" gap={1}>
              {allDays.map((day, index) => {
                const formattedDate = format(day, "yyyy-MM-dd");
                const formattedDateLabel = format(day, "yyyy MMMM dd");
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
                        {renderTooltipDetails("days")}
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
                      border={isToday ? "2px solid black" : ""}
                      cursor="pointer" // Indicate that the box is clickable
                      onMouseEnter={() => handleMouseEnter(formattedDate)}
                      onMouseLeave={() => handleMouseLeave()}
                    />
                  </Tooltip>
                );
              })}
            </Grid>
            <Heading size="lg">Weekly Activity</Heading>
            <Grid templateColumns="repeat(8, 1fr)" gap={2}>
              {allWeeks.map((week, index) => {
                const formattedWeek = format(week, "yyyy-ww"); // Format as 'year-week'
                const formattedWeekLabel = `Week ${getISOWeek(week)} - ${format(week, "yyyy")}`;
                const isThisWeek =
                  getISOWeek(week) === getISOWeek(today) &&
                  getYear(week) === getYear(today);
                const activityCount =
                  activityData?.weeks[formattedWeek]?.total || 0;
                const tooltipLabel = `${formattedWeekLabel} - ${activityCount} contributions`;

                return (
                  <Tooltip
                    label={
                      <>
                        <Box>{tooltipLabel}</Box>
                        {renderTooltipDetails("weeks")}
                      </>
                    }
                    key={index}
                    placement="top"
                  >
                    <Box
                      width="30px"
                      height="30px"
                      bg={getWeekColor(activityCount)} // Function to determine color based on activity
                      borderRadius="md"
                      border={isThisWeek ? "2px solid black" : ""}
                      onMouseEnter={() => handleMouseEnter(formattedWeek)}
                      onMouseLeave={() => handleMouseLeave()}
                    />
                  </Tooltip>
                );
              })}
            </Grid>

            <Heading size="lg">Monthly Activity</Heading>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}>
              {allMonths.map((month, index) => {
                const formattedMonth = format(month, "yyyy-MM");
                const formattedMonthLabel = format(month, "yyyy MMMM");
                const isMonth = getMonth(formattedMonth) === getMonth(today);
                const activityCount =
                  activityData?.months[formattedMonth]?.total || 0;
                const tooltipLabel = `${formattedMonthLabel} - ${activityCount} contributions`;

                return (
                  <Tooltip
                    label={
                      <>
                        <Box>{tooltipLabel}</Box>
                        {renderTooltipDetails("months")}
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
                      border={isMonth ? "2px solid black" : ""}
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
                        {renderTooltipDetails("years")}{" "}
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
                      border={isYear ? "2px solid black" : ""}
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

export default ActivityCalendarPage;
