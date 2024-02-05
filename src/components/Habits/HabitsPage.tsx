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

function getDayOfWeekString(date: any) {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  const dayIndex = date.getDay();
  return weekdays[dayIndex];
}

const HabitsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);
  console.log('selectedYear: ', selectedYear);
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
    refetch: getAllHabitsTrackers,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsTrackerApi.getAllHabitsTrackers,
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
    const date = new Date();
    setSelectedMonth(date.getMonth());
  }, []);

  useEffect(() => {
    if (createHabitsTrackerData || deleteHabitsTrackerData) {
      getAllHabitsTrackers();
    }
  }, [createHabitsTrackerData, deleteHabitsTrackerData]);

  useEffect(() => {
    if (createHabitData || deleteHabitData) {
      getLatestHabits();
    }
  }, [createHabitData, deleteHabitData]);

  function renderBody() {
    let res = [];
    for (let i = 1; i <= MONTHS[selectedMonth].days; i++) {
      const date = new Date(
        `2024-${
          selectedMonth < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1
        }-${i < 10 ? `0${i}` : i}T00:00:00`,
      );

      res.push(
        <Tr>
          <Td
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
            width="50px"
          >
            {i} - {getDayOfWeekString(date)}
          </Td>
          {habits?.map((habit: any) => {
            const foundHabitTracker = habitsTrackers?.find(
              (habitTracker: any) => {
                const habitTrackerDate = new Date(habitTracker.created_at);
                const day = habitTrackerDate.getDate();
                const month = habitTrackerDate.getMonth();
                const year = habitTrackerDate.getFullYear();

                if (
                  day === i &&
                  month === selectedMonth &&
                  year === selectedYear &&
                  habitTracker.habit_id === habit.id
                )
                  return habitTracker;
              },
            );

            return (
              <Td textAlign="center" border="1px solid" borderColor="gray.200">
                <Checkbox
                  isChecked={foundHabitTracker ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const date = new Date(
                        `2024-02-${i < 10 ? `0${i}` : i}T00:00:00`,
                      );

                      createHabitsTracker({
                        habit_id: habit.id,
                        created_at: date,
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
    }
    return res;
  }

  return (
    <CustomLayout>
      <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
        Habits
      </Heading>
      <Flex alignItems="center" marginBottom="20px">
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={() => {
            const newMonth = selectedMonth - 1 === -1 ? 11 : selectedMonth - 1;
            setSelectedMonth(newMonth);
            if (newMonth === 11) {
              setSelectedYear(selectedYear - 1);
            }
          }}
        >
          Previous
        </Button>
        <Text fontSize="lg" paddingX="10px">
          {MONTHS[selectedMonth].name} {selectedYear}
        </Text>
        <Button
          display="flex"
          colorScheme="teal"
          type="submit"
          onClick={() => {
            const newMonth = selectedMonth + 1 === 12 ? 0 : selectedMonth + 1;

            setSelectedMonth(newMonth);
            if (newMonth === 0) {
              setSelectedYear(selectedYear + 1);
            }
          }}
        >
          Next
        </Button>
      </Flex>
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
          <Tbody>{renderBody()}</Tbody>
        </Table>
      </TableContainer>
    </CustomLayout>
  );
};

export default HabitsPage;
