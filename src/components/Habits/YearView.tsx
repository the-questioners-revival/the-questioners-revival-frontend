import React, { useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Flex, Text } from '@chakra-ui/react';

const YearView = ({ onChange }: { onChange: Function }) => {
  const [selectedYear, setSelectedYear] = useState<any>();
  const [selectedYearDate, setSelectedYearDate] = useState<any>();
  const [years, setYears] = useState<any>();

  const handlePreviousYear = () => {
    setSelectedYear(selectedYear - 1);
    generateYears(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
    generateYears(selectedYear + 1);
  };

  function generateYears(year?: any) {
    const currentDate = moment(`${year ? year : selectedYear}-01-01`);

    const newYears: { startDate: moment.Moment; endDate: moment.Moment }[] = [];
    const startOfYear = moment(currentDate).startOf('year');
    const endOfYear = moment(currentDate).endOf('year');

    let yearStart = startOfYear.clone();
    while (yearStart.isBefore(endOfYear)) {
      const endOfMonth = moment(yearStart).endOf('year');

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
  }

  useEffect(() => {
    const currentYear = moment().year();

    setSelectedYear(currentYear);
    generateYears(currentYear);
  }, []);

  useEffect(() => {
    if (years) {
      setSelectedYearDate(years[0]);
      onChange(years[0]);
    }
  }, [years]);

  // useEffect(() => {
  //   if (selectedYearNumber === 0) {
  //     setSelectedYear(selectedYear - 1);
  //     generateYears(selectedYear - 1, true);
  //   } else if (selectedYearNumber === years?.length + 1) {
  //     setSelectedYear(selectedYear + 1);
  //     generateYears(selectedYear + 1, false);
  //   }
  //   if (years) {
  //
  //
  //     setSelectedYearDate(years[selectedYearNumber - 1 - 2024]);
  //     onChange(years[selectedYearNumber - 1 - 2024]);
  //   }
  // }, [selectedYearNumber, years]);

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
          Year {selectedYear} - {selectedYear + 1}
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
