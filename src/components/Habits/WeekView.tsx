import React, { useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Flex, Text } from '@chakra-ui/react';

const WeekView = ({ onChange }: { onChange: Function }) => {
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(1);
  const [selectedWeekDate, setSelectedWeekDate] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>(2024);
  const [weeks, setWeeks] = useState<any>();
  const [firstLoad, setFirstLoad] = useState(true);

  const handlePreviousWeek = () => {
    setSelectedWeekNumber(selectedWeekNumber - 1);
  };

  const handleNextWeek = () => {
    setSelectedWeekNumber(selectedWeekNumber + 1);
  };

  function generateWeeks(year?: any, minus?: boolean) {
    let currentDate = moment(`${year}-01-01`);
    const day = moment(currentDate).day();
    // If it's not Monday (day !== 1), calculate how many days to add to get to the next Monday
    if (day !== 1) {
      const daysToAdd = (7 - day + 1) % 7;  // If it's not Monday, calculate days to next Monday
      currentDate = currentDate.add(daysToAdd, 'days');
    }

    const newWeeks: { startDate: moment.Moment; endDate: moment.Moment }[] = [];
    const startOfYear = moment(currentDate);
    const endOfYear = moment(currentDate).endOf('year');

    let weekStart = startOfYear.clone();
    while (weekStart.isBefore(endOfYear)) {

      const weekEnd =
        weekStart.clone().endOf('week').add(1, 'day');
      newWeeks.push({
        startDate: weekStart.clone().endOf('day'),
        endDate: weekEnd,
      });
      weekStart = weekEnd.clone().add(1, 'day');
    }
    setWeeks(newWeeks);
    if (firstLoad) {
      const now = moment();
      now.endOf('day');
      const day = now.day();

      const foundWeek = newWeeks?.findIndex(
        (week: any) => now >= week.startDate && now <= week.endDate,
      );

      setSelectedWeekNumber(foundWeek + 1);
      setFirstLoad(false);
    } else {
      setSelectedWeekNumber(minus ? newWeeks.length : 1);
    }
  }

  useEffect(() => {
    const currentYear = moment().year();

    setSelectedYear(currentYear);
    generateWeeks(currentYear);
  }, []);

  useEffect(() => {
    if (selectedWeekNumber === 0) {
      setSelectedYear(selectedYear - 1);
      generateWeeks(selectedYear - 1, true);
    } else if (selectedWeekNumber === weeks?.length + 1) {
      setSelectedYear(selectedYear + 1);
      generateWeeks(selectedYear + 1, false);
    }
    if (weeks) {
      setSelectedWeekDate(weeks[selectedWeekNumber - 1]);
      onChange(weeks[selectedWeekNumber - 1]);
    }
  }, [selectedWeekNumber, weeks]);

  return (
    <div>
      <Flex alignItems="center" marginBottom="20px">
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handlePreviousWeek}
        >
          Previous
        </Button>
        <Text fontSize="lg" paddingX="10px">
          Week {selectedWeekNumber} - {selectedYear}
        </Text>
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handleNextWeek}
        >
          Next
        </Button>
      </Flex>
      {selectedWeekDate && (
        <div>
          <div>
            {selectedWeekDate.startDate.format('MMMM D')} -{' '}
            {selectedWeekDate.endDate.format('MMMM D')}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekView;
