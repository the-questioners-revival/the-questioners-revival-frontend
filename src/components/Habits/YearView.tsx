import React, { useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Flex, Text } from '@chakra-ui/react';

const YearView = ({ onChange }: { onChange: Function }) => {
  const [selectedYearNumber, setSelectedYearNumber] = useState(1);
  const [selectedYearDate, setSelectedYearDate] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>(2024);
  const [years, setYears] = useState<any>();
  const [firstLoad, setFirstLoad] = useState(true);

  const handlePreviousYear = () => {
    setSelectedYearNumber(selectedYearNumber - 1);
  };

  const handleNextYear = () => {
    setSelectedYearNumber(selectedYearNumber + 1);
  };

  function generateYears(year?: any, minus?: boolean) {
    const currentDate = moment(`${year}-01-01`);

    const newYears: { startDate: moment.Moment; endDate: moment.Moment }[] = [];
    const startOfYear = moment(currentDate).startOf('year');
    const endOfYear = moment(currentDate).endOf('year');

    let yearStart = startOfYear.clone();
    while (yearStart.isBefore(endOfYear)) {
      const endOfMonth = moment(yearStart).endOf('month');

      const yearEnd =
        yearStart.clone().endOf('year').add(1, 'day') > endOfMonth
          ? endOfMonth
          : yearStart.clone().endOf('year').add(1, 'day');
      newYears.push({
        startDate: yearStart.clone().endOf('day'),
        endDate: yearEnd,
      });
      yearStart = yearEnd.clone().add(1, 'day');
    }
    setYears(newYears);
    if (firstLoad) {
      const now = moment();
      setSelectedYearNumber(now.year() + 1);
      setFirstLoad(false);
    } else {
      setSelectedYearNumber(minus ? newYears.length : 1);
    }
  }

  useEffect(() => {
    const currentYear = moment().year();

    setSelectedYear(currentYear);
    generateYears(currentYear);
  }, []);

  useEffect(() => {
    if (selectedYearNumber === 0) {
      setSelectedYear(selectedYear - 1);
      generateYears(selectedYear - 1, true);
    } else if (selectedYearNumber === years?.length + 1) {
      setSelectedYear(selectedYear + 1);
      generateYears(selectedYear + 1, false);
    }
    if (years) {
      setSelectedYearDate(years[selectedYearNumber - 1]);
      onChange(years[selectedYearNumber - 1]);
    }
  }, [selectedYearNumber, years]);

  return (
    <div>
      <Flex alignItems="center" marginBottom="20px">
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handlePreviousYear}
        >
          Previous
        </Button>
        <Text fontSize="lg" paddingX="10px">
          Year {selectedYearNumber} - {selectedYear}
        </Text>
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handleNextYear}
        >
          Next
        </Button>
      </Flex>
      {selectedYearDate && (
        <div>
          <div>
            {selectedYearDate.startDate.format('MMMM D')} -{' '}
            {selectedYearDate.endDate.format('MMMM D')}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearView;
