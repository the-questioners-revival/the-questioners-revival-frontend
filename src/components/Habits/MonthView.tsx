import React, { useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Flex, Text } from '@chakra-ui/react';
import { MONTHS } from '../../helpers/months';

const MonthView = ({ onChange }: { onChange: Function }) => {
  const [selectedMonthNumber, setSelectedMonthNumber] = useState(1);
  const [selectedMonthDate, setSelectedMonthDate] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>(2024);
  const [months, setMonths] = useState<any>();

  const handlePreviousMonth = () => {
    setSelectedMonthNumber(selectedMonthNumber - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonthNumber(selectedMonthNumber + 1);
  };

  function generateMonths(year?: any, minus?: boolean) {
    const currentDate = moment(`${year}-01-01`);

    const newMonths: { startDate: moment.Moment; endDate: moment.Moment }[] =
      [];
    const startOfYear = moment(currentDate).startOf('year');
    const endOfYear = moment(currentDate).endOf('year');

    let currentMonthStart = startOfYear.clone();
    while (currentMonthStart.isBefore(endOfYear)) {
      const endOfMonth = moment(currentMonthStart).endOf('month');

      const monthEnd =
        currentMonthStart.clone().endOf('month').add(1, 'day') > endOfMonth
          ? endOfMonth
          : currentMonthStart.clone().endOf('month').add(1, 'day');
      newMonths.push({
        startDate: currentMonthStart.clone().endOf('day'),
        endDate: monthEnd,
      });
      currentMonthStart = monthEnd.clone().add(1, 'day');
    }
    setMonths(newMonths);
    setSelectedMonthNumber(minus ? newMonths.length : 1);
  }

  useEffect(() => {
    const currentDate = moment();

    setSelectedYear(currentDate.year());
    generateMonths(currentDate.year());
  }, []);

  useEffect(() => {
    if (selectedMonthNumber === 0) {
      setSelectedYear(selectedYear - 1);
      generateMonths(selectedYear - 1, true);
    } else if (selectedMonthNumber === months?.length + 1) {
      setSelectedYear(selectedYear + 1);
      generateMonths(selectedYear + 1, false);
    }
    if (months) {
      setSelectedMonthDate(months[selectedMonthNumber - 1]);
      onChange(months[selectedMonthNumber - 1]);
    }
  }, [selectedMonthNumber, months]);

  return (
    <div>
      <Flex alignItems="center" marginBottom="20px">
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handlePreviousMonth}
        >
          Previous
        </Button>
        <Text fontSize="lg" paddingX="10px">
          {selectedMonthNumber > 0 && selectedMonthNumber !== months?.length + 1
            ? MONTHS[selectedMonthNumber].name
            : null}{' '}
          - {selectedYear}
        </Text>
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={handleNextMonth}
        >
          Next
        </Button>
      </Flex>
      {selectedMonthDate && (
        <div>
          <div>
            {selectedMonthDate.startDate.format('MMMM D')} -{' '}
            {selectedMonthDate.endDate.format('MMMM D')}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthView;
