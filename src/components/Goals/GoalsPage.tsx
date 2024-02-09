import { Text, Heading, Select } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { useState } from 'react';
import WeekView from '../Habits/WeekView';
import MonthView from '../Habits/MonthView';
import GoalsList from '../Summary/GoalsList';

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

const GoalsPage = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [viewType, setViewType] = useState(viewTypeOptions[0].value);

  return (
    <CustomLayout>
      <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
        Goals
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
      ) : (
        <MonthView
          onChange={(val: any) => {
            setStartDate(val?.startDate);
            setEndDate(val?.endDate);
          }}
        ></MonthView>
      )}
      <GoalsList startDate={startDate} endDate={endDate} type={viewType} />
    </CustomLayout>
  );
};

export default GoalsPage;
