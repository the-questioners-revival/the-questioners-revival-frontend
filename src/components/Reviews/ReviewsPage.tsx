import { Text, Heading, Select } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { useState } from 'react';
import WeekView from '../Habits/WeekView';
import MonthView from '../Habits/MonthView';
import ReviewsList from '../Summary/ReviewsList';
import YearView from '../Habits/YearView';
import ProtectedPage from '../ProtectedPage';

export const viewTypeOptions = [
  {
    value: 'weekly',
    name: 'Weekly',
  },
  {
    value: 'monthly',
    name: 'Monthly',
  },
  {
    value: 'yearly',
    name: 'Yearly',
  },
];

export function getDayOfWeekString(date: any) {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayIndex = date.getDay();
  return weekdays[dayIndex];
}

const ReviewssPage = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [viewType, setViewType] = useState(viewTypeOptions[0].value);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
          Reviews
        </Heading>
        <Text>View Option</Text>
        <Select
          value={viewType}
          onChange={(evt) => setViewType(evt.target.value)}
          placeholder="Type"
          color="black"
          bg="white"
          marginBottom="10px"
          width="fit-content"
        >
          {viewTypeOptions?.map((option) => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </Select>
        {viewType === viewTypeOptions[0].value ? (
          <WeekView
            onChange={(val: any) => {
              setStartDate(val?.startDate);
              setEndDate(val?.endDate);
            }}
          ></WeekView>
        ) : null}
        {viewType === viewTypeOptions[1].value ? (
          <MonthView
            onChange={(val: any) => {
              setStartDate(val?.startDate);
              setEndDate(val?.endDate);
            }}
          ></MonthView>
        ) : null}
        {viewType === viewTypeOptions[2].value ? (
          <YearView
            onChange={(val: any) => {
              console.log('val: ', val);
              setStartDate(val?.startDate);
              setEndDate(val?.endDate);
            }}
          ></YearView>
        ) : null}
        <ReviewsList startDate={startDate} endDate={endDate} type={viewType} />
      </CustomLayout>
    </ProtectedPage>
  );
};

export default ReviewssPage;
