import { Box, Button, Flex, Text } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import SummaryList from './SummaryList';
import useAbstractProvider from '../../providers/AbstractProvider';
import TodoApi from '../../api/todo';
import QaaApi from '../../api/qaa';
import BlogApi from '../../api/blog';
import { useEffect, useState } from 'react';
import useAbstractMutator from '../../providers/AbstractMutator';
import { MONTHS } from '../../helpers/months';

const SummaryPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [data, setData] = useState();
  const date = new Date();
  const month = date.getMonth();

  useEffect(() => {
    // const from = new Date(
    //   `${selectedYear}-${
    //     selectedMonth < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1
    //   }-01T00:00:00`,
    // );
    // const to = new Date(
    //   `${selectedYear}-${
    //     selectedMonth < 9 ? `0${selectedMonth + 1}` : selectedMonth + 1
    //   }-01T00:00:00`,
    // );
  }, [selectedMonth, selectedYear]);

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

  useEffect(() => {
    const date = new Date();
    setSelectedMonth(date.getMonth());
  }, []);

  useEffect(() => {
    const from = new Date(
      `${selectedYear}-${
        selectedMonth + 1 < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1
      }-01T00:00:00`,
    ).toISOString();

    const to = new Date(
      `${selectedYear}-${
        selectedMonth + 1 < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1
      }-${MONTHS[selectedMonth].days}T23:59:00`,
    ).toISOString();

    getAllTodosGroupedByDate({
      from: from,
      to: to,
    });
    getAllQaasGroupedByDate({ from: from, to: to });
    getAllBlogsGroupedByDate({
      from: from,
      to: to,
    });
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (
      getAllTodosGroupedByDateData &&
      getAllQaasGroupedByDateData &&
      getAllBlogsGroupedByDateData
    ) {
      const combinedData: any = [];

      // Add blogs to the combinedData array
      getAllBlogsGroupedByDateData.forEach((blogItem: any) => {
        const existingDateIndex = combinedData.findIndex(
          (item: any) => item.date === blogItem.date,
        );

        if (existingDateIndex !== -1) {
          // Date already exists, add the blog to the existing array
          combinedData[existingDateIndex].blogs.push(blogItem.blogs);
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
          (item: any) => item.date === qaaItem.date,
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
          (item: any) => item.date === todoItem.date,
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

        return bDate - aDate;
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
      getAllBlogsGroupedByDate();
    }
  }, [createBlogData, editBlogData, removeBlogData]);

  return (
    <CustomLayout>
      <Box paddingTop="20px">
        <Flex alignItems="center" marginBottom="20px">
          <Button
            display="flex"
            colorScheme="teal"
            type="submit"
            onClick={() => {
              const newMonth =
                selectedMonth - 1 === -1 ? 11 : selectedMonth - 1;
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
        <SummaryList
          data={data}
          createBlog={createBlog}
          editBlog={editBlog}
          removeBlog={removeBlog}
        />
      </Box>
    </CustomLayout>
  );
};

export default SummaryPage;
