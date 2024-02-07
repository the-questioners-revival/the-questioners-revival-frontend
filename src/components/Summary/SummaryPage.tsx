import { Box, Button, Flex, Select, Text } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import SummaryList from './SummaryList';
import useAbstractProvider from '../../providers/AbstractProvider';
import TodoApi from '../../api/todo';
import QaaApi from '../../api/qaa';
import BlogApi from '../../api/blog';
import { useEffect, useState } from 'react';
import useAbstractMutator from '../../providers/AbstractMutator';
import { MONTHS } from '../../helpers/months';
import HabitsApi from '../../api/habit';
import HabitsTrackerApi from '../../api/habitsTracker';
import WeekView from '../Habits/WeekView';
import MonthView from '../Habits/MonthView';
import { viewTypeOptions } from '../Habits/HabitsPage';

const SummaryPage = () => {
  const [startDate, setStartDate] = useState<any>(null);

  const [endDate, setEndDate] = useState<any>(null);

  const [viewType, setViewType] = useState(viewTypeOptions[0].value);

  const [data, setData] = useState();

  const {
    data: getDailyHabitsData,
    refetch: getDailyHabits,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsApi.getDailyHabits,
  );

  const {
    data: getDailyHabitsTrackersData,
    refetch: getDailyHabitsTrackers,
  }: { data: any; refetch: Function } = useAbstractProvider(
    HabitsTrackerApi.getDailyHabitsTrackers,
  );

  const {
    data: getAllTodosGroupedByDateData,
    refetch: getAllTodosGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    TodoApi.getAllTodosGroupedByDate,
    null,
    false,
  );

  const {
    data: getAllQaasGroupedByDateData,
    refetch: getAllQaasGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    QaaApi.getAllQaasGroupedByDate,
    null,
    false,
  );

  const {
    data: getAllBlogsGroupedByDateData,
    refetch: getAllBlogsGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    BlogApi.getAllBlogsGroupedByDate,
    null,
    false,
  );

  const {
    data: createBlogData,
    mutate: createBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.createBlog);

  const {
    data: editBlogData,
    mutate: editBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.editBlog);

  const {
    data: removeBlogData,
    mutate: removeBlog,
  }: { data: any; mutate: Function } = useAbstractMutator(BlogApi.removeBlog);

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
    if (startDate && endDate) {
      getAllTodosGroupedByDate({
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString(),
      });
      getAllQaasGroupedByDate({
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString(),
      });
      getAllBlogsGroupedByDate({
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString(),
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getDailyHabitsTrackers();
  }, [createHabitsTrackerData, deleteHabitsTrackerData]);

  useEffect(() => {
    if (
      getAllTodosGroupedByDateData &&
      getAllQaasGroupedByDateData &&
      getAllBlogsGroupedByDateData
    ) {
      const combinedData: any = [];

      let weekStart = startDate.clone();

      let weekEnd = endDate.clone();

      while (weekStart.isBefore(weekEnd.clone().add(1, 'day'))) {
        const myDate = new Date(weekStart).toISOString();

        combinedData.push({
          date: myDate,
          blogs: [],
          todos: [],
          qaas: [],
        });
        weekStart = weekStart.clone().add(1, 'day');
      }

      // Add blogs to the combinedData array
      getAllBlogsGroupedByDateData.forEach((blogItem: any) => {
        const existingDateIndex = combinedData.findIndex(
          (item: any) => item?.date?.slice(0, 10) === blogItem?.date?.slice(0, 10),
        );

        if (existingDateIndex !== -1) {
          // Date already exists, add the blog to the existing array
          combinedData[existingDateIndex].blogs = blogItem.blogs;
        } else {
          // Date doesn't exist, create a new entry
          combinedData.push({
            date: blogItem.date,
            blogs: blogItem.blogs,
          });
        }
      });

      // Add qaas to the combinedData array
      getAllQaasGroupedByDateData.forEach((qaaItem: any) => {
        const existingDateIndex = combinedData.findIndex(
          (item: any) => item?.date?.slice(0, 10) === qaaItem?.date?.slice(0, 10),
        );

        if (existingDateIndex !== -1) {
          // Date already exists, add the qaa to the existing array
          combinedData[existingDateIndex].qaas = qaaItem.qaas;
        } else {
          // Date doesn't exist, create a new entry
          combinedData.push({
            date: qaaItem.date,
            qaas: qaaItem.qaas,
          });
        }
      });

      // Add todos to the combinedData array
      getAllTodosGroupedByDateData.forEach((todoItem: any) => {
        const existingDateIndex = combinedData.findIndex(
          (item: any) => item?.date?.slice(0, 10) === todoItem?.date?.slice(0, 10),
        );

        if (existingDateIndex !== -1) {
          // Date already exists, add the todo to the existing array
          combinedData[existingDateIndex].todos = todoItem.todos;
        } else {
          // Date doesn't exist, create a new entry
          combinedData.push({
            date: new Date(todoItem.date),
            todos: todoItem.todos,
          });
        }
      });
      const combinedDataSortedByDate = combinedData.sort((a: any, b: any) => {
        const aDate = new Date(a.date) as any;
        const bDate = new Date(b.date) as any;

        return bDate + aDate;
      });

      setData(combinedDataSortedByDate);
      // Now, combinedData contains the merged data grouped by date
    }
  }, [
    getAllTodosGroupedByDateData,
    getAllQaasGroupedByDateData,
    getAllBlogsGroupedByDateData,
  ]);

  useEffect(() => {
    if (createBlogData || editBlogData || removeBlogData) {
      getAllBlogsGroupedByDate({
        from: new Date(startDate).toISOString(),
        to: new Date(endDate).toISOString(),
      });
    }
  }, [createBlogData, editBlogData, removeBlogData]);

  return (
    <CustomLayout>
      <Box paddingTop="20px">
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
        <SummaryList
          data={data}
          createBlog={createBlog}
          editBlog={editBlog}
          removeBlog={removeBlog}
          dailyHabits={getDailyHabitsData}
          dailyHabitsTrackers={getDailyHabitsTrackersData}
          createHabitsTracker={createHabitsTracker}
          deleteHabitsTracker={deleteHabitsTracker}
        />
      </Box>
    </CustomLayout>
  );
};

export default SummaryPage;
