import {
  Box,
  Button,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  Flex,
  Select,
} from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { MONTHS } from '../../helpers/months';
import useAbstractProvider from '../../providers/AbstractProvider';
import HabitsApi from '../../api/habit';
import HabitsTrackerApi from '../../api/habitsTracker';
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CreateHabitForm from '../Qaa/CreateHabitForm';
import { CloseIcon } from '@chakra-ui/icons';
import WeekView from './WeekView';
import moment from 'moment';
import MonthView from './MonthView';

const viewTypeOptions = [
  {
    value: 'weekly',
    name: 'Weekly',
  },
  {
    value: 'monthly',
    name: 'Monthly',
  },
];

function getDayOfWeekString(date: any) {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayIndex = date.getDay();
  return weekdays[dayIndex];
}

const HabitsPage = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [viewType, setViewType] = useState(viewTypeOptions[0].value);

  const {
    data: habits,
    refetch: getLatestHabits,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsApi.getLatestHabits,
  );

  const {
    data: createHabitData,
    mutate: createHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsApi.createHabit,
  );

  const {
    data: deleteHabitData,
    mutate: deleteHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsApi.removeHabit,
  );

  const {
    data: habitsTrackers,
    refetch: getHabitsTrackersFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsTrackerApi.getHabitsTrackersFromTo,
    null,
    false,
  );

  const {
    data: createHabitsTrackerData,
    mutate: createHabitsTracker,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsTrackerApi.createHabitsTracker,
  );

  const {
    data: deleteHabitsTrackerData,
    mutate: deleteHabitsTracker,
  }: { data: any; mutate: Function } = useAbstractMutator(
    HabitsTrackerApi.deleteHabitsTracker,
  );

  useEffect(() => {
    if (createHabitsTrackerData || deleteHabitsTrackerData) {
      if (startDate && endDate) {
        getHabitsTrackersFromTo({
          from: new Date(startDate).toISOString(),
          to: new Date(endDate).toISOString(),
        });
      }
    }
  }, [createHabitsTrackerData, deleteHabitsTrackerData, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      getHabitsTrackersFromTo({
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString(),
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (createHabitData || deleteHabitData) {
      getLatestHabits();
    }
  }, [createHabitData, deleteHabitData]);

  function renderBody() {
    
    let res = [];

    let weekStart = startDate.clone();
    let weekEnd = endDate.clone()
    while (weekStart.isBefore(weekEnd.clone().add(1, 'day'))) {
      res.push(
        <Tr>
          <Td
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
            width="50px"
            position="sticky"
            left="0"
            background="white"
            zIndex="docked"
            color="black"
            p="0px 5px"
          >
            {moment(weekStart).date()} -{' '}
            {getDayOfWeekString(new Date(weekStart))}
          </Td>
          {habits?.map((habit: any) => {
            const myDate = new Date(weekStart).toISOString();

            const foundHabitTracker = habitsTrackers?.find(
              (habitTracker: any) => {
                const habitTrackerDate = habitTracker.created_at;

                if (
                  habitTrackerDate?.slice(0, 10) === myDate?.slice(0, 10) &&
                  habitTracker.habit_id === habit.id
                )
                  return habitTracker;
              },
            );

            return (
              <Td textAlign="center" border="1px solid" borderColor="gray.200">
                <Checkbox
                  colorScheme="green"
                  isChecked={foundHabitTracker ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      createHabitsTracker({
                        habit_id: habit.id,
                        created_at: myDate,
                      });
                    } else {
                      deleteHabitsTracker(foundHabitTracker?.id);
                    }
                  }}
                />
              </Td>
            );
          })}
        </Tr>,
      );
      weekStart = weekStart.clone().add(1, 'day');
    }
    return res;
  }

  return (
    <CustomLayout>
      <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
        Habits
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
      <CreateHabitForm createHabit={createHabit} />
      <TableContainer
        overflowX="scroll"
        overflowY="unset"
        width="100%"
        mt="20px"
      >
        <Table variant="simple" position="relative">
          <Thead position="sticky" top="0" background="white" zIndex="docked">
            <Tr>
              <Th
                style={{ writingMode: 'vertical-rl' }}
                border="1px solid"
                borderColor="gray.200"
                width="50px"
              >
                Days
              </Th>
              {habits?.map((habit: any) => (
                <Th
                  style={{ writingMode: 'vertical-rl' }}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="100%"
                  >
                    {habit.title}
                    <CloseIcon
                      cursor="pointer"
                      w={4}
                      h={4}
                      marginTop="7px"
                      color="black"
                      onClick={() => {
                        deleteHabit(habit.id);
                      }}
                    />
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          {startDate ? <Tbody>{renderBody()}</Tbody> : null}
        </Table>
      </TableContainer>
    </CustomLayout>
  );
};

export default HabitsPage;
