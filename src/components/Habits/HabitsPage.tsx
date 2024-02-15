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
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { MONTHS } from '../../helpers/months';
import useAbstractProvider from '../../providers/AbstractProvider';
import HabitsApi from '../../api/habit';
import HabitsTrackerApi from '../../api/habitsTracker';
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CreateHabitForm from '../Qaa/CreateHabitForm';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import WeekView from './WeekView';
import moment from 'moment';
import MonthView from './MonthView';
import YearView from './YearView';
import CustomModal from '../custom/CustomModal';
import EditHabitForm from './EditHabitForm';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
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

const HabitsPage = () => {
  const [isOpenEditHabitModal, setIsOpenEditHabitModal] = useState(false);
  const [isOpenDeleteHabitModal, setIsOpenDeleteHabitModal] = useState(false);
  const [habitSelected, setHabitSelected] = useState<any>();
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
    data: editHabitData,
    mutate: editHabit,
  }: { data: any; mutate: Function } = useAbstractMutator(HabitsApi.editHabit);

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
    if (createHabitData || editHabitData || deleteHabitData) {
      getLatestHabits();
    }
  }, [createHabitData, deleteHabitData, editHabitData]);

  function renderBody() {
    let res = [];

    let weekStart = startDate.clone();
    let weekEnd = endDate.clone();
    while (weekStart.isBefore(weekEnd.clone().add(1, 'day'))) {
      const myDate = new Date(weekStart).toISOString();

      const now = new Date();
      const isItToday =
        moment.tz(now, 'Asia/Manila').format('DD.MM.YYYY') ===
        moment.tz(myDate, 'Asia/Manila').format('DD.MM.YYYY');

      res.push(
        <Tr>
          <Td
            textAlign="center"
            border={`${isItToday ? '2px solid #FFDF00' : '1px solid white'}`}
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
              <Td
                key={habit.id}
                textAlign="center"
                border={`${
                  isItToday ? '2px solid #FFDF00' : '1px solid white'
                }`}
              >
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
    <ProtectedPage>
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
                    key={habit.id}
                    style={{ writingMode: 'vertical-rl' }}
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      w="100%"
                      h="100%"
                    >
                      {habit.title}
                      <Flex>
                        <Flex
                          w="100%"
                          h="100%"
                          cursor="pointer"
                          onClick={() => {
                            setIsOpenEditHabitModal(true);
                            setHabitSelected(habit);
                          }}
                        >
                          <EditIcon
                            w={4}
                            h={4}
                            marginTop="7px"
                            marginBottom="7px"
                            color="black"
                          />
                        </Flex>
                        <Flex
                          w="100%"
                          h="100%"
                          cursor="pointer"
                          onClick={() => {
                            setIsOpenDeleteHabitModal(true);
                            setHabitSelected(habit);
                          }}
                        >
                          <CloseIcon
                            cursor="pointer"
                            w={4}
                            h={4}
                            marginTop="7px"
                            color="black"
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            {startDate ? <Tbody>{renderBody()}</Tbody> : null}
          </Table>
        </TableContainer>
        <CustomConfirmationModal
          primaryAction={() => {
            deleteHabit(habitSelected?.id);
            setIsOpenDeleteHabitModal(false);
          }}
          secondaryAction={() => {}}
          title={`Remove habit`}
          description={`Are you sure you want to remove habit with id ${habitSelected?.id}`}
          primaryActionText="Remove"
          secondaryActionText="Cancel"
          isOpen={isOpenDeleteHabitModal}
          closeModal={() => setIsOpenDeleteHabitModal(false)}
        />
        <CustomModal
          isOpen={isOpenEditHabitModal}
          closeModal={() => setIsOpenEditHabitModal(false)}
        >
          <ModalHeader>Edit Habit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditHabitForm
              habit={habitSelected}
              editHabit={(data: any) => {
                editHabit(data);
                setIsOpenEditHabitModal(false);
              }}
            />
          </ModalBody>
        </CustomModal>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default HabitsPage;
