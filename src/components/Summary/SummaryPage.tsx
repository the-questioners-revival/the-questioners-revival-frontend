import { Box, Grid, GridItem, Select, Text } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import SummaryList from './SummaryList';
import { useEffect, useState } from 'react';
import WeekView from '../Habits/WeekView';
import MonthView from '../Habits/MonthView';
import { viewTypeOptions } from '../Habits/HabitsPage';
import GoalsListSimple from './GoalsListSimple';
import YearView from '../Habits/YearView';
import ReviewsListSimple from './ReviewsListSimple';
import ProtectedPage from '../ProtectedPage';
import BlogsProvider from '../../providers/BlogsProvider';
import QaasProvider from '../../providers/QaasProvider';
import TodosProvider from '../../providers/TodosProvider';
import HabitsProvider from '../../providers/HabitsProvider';
import HabitsTrackerProvider from '../../providers/HabitsTrackerProvider';

const SummaryPage = () => {
  const [startDate, setStartDate] = useState<any>(null);

  const [endDate, setEndDate] = useState<any>(null);

  const [viewType, setViewType] = useState(viewTypeOptions[0].value);

  const [data, setData] = useState();

  const { getDailyHabitsData } = HabitsProvider();

  const {
    getDailyHabitsTrackers,
    getDailyHabitsTrackersData,
    createHabitsTrackerData,
    createHabitsTracker,
    deleteHabitsTrackerData,
    deleteHabitsTracker,
  } = HabitsTrackerProvider();

  const { getAllTodosGroupedByDateData, getAllTodosGroupedByDate } =
    TodosProvider();

  const { getAllQaasGroupedByDateData, getAllQaasGroupedByDate } =
    QaasProvider();

  const {
    getAllBlogsGroupedByDateData,
    getAllBlogsGroupedByDate,
    createBlogData,
    createBlog,
    editBlogData,
    editBlog,
    removeBlogData,
    removeBlog,
  } = BlogsProvider();

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
          (item: any) =>
            item?.date?.length > 0 &&
            blogItem?.date?.length > 0 &&
            item?.date?.slice(0, 10) === blogItem?.date?.slice(0, 10),
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
          (item: any) =>
            item?.date?.length > 0 &&
            qaaItem?.date?.length > 0 &&
            item?.date?.slice(0, 10) === qaaItem?.date?.slice(0, 10),
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
          (item: any) =>
            item?.date?.length > 0 &&
            todoItem?.date?.length > 0 &&
            item?.date?.slice(0, 10) === todoItem?.date?.slice(0, 10),
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
    <ProtectedPage>
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
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={6}
          >
            <GridItem>
              <GoalsListSimple
                startDate={startDate}
                endDate={endDate}
                type={viewType}
              />
            </GridItem>
            <GridItem>
              <ReviewsListSimple
                startDate={startDate}
                endDate={endDate}
                type={viewType}
              />
            </GridItem>
          </Grid>
          {data && getDailyHabitsData && getDailyHabitsTrackersData ? (
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
          ) : null}
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default SummaryPage;
