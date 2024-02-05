import { Box } from '@chakra-ui/react';
import CustomLayout from '../layout/Layout';
import SummaryList from './SummaryList';
import useAbstractProvider from '../../providers/AbstractProvider';
import TodoApi from '../../api/todo';
import QaaApi from '../../api/qaa';
import BlogApi from '../../api/blog';
import { useEffect, useState } from 'react';
import useAbstractMutator from '../../providers/AbstractMutator';

const SummaryPage = () => {
  const [data, setData] = useState();
  const {
    data: getAllTodosGroupedByDateData,
  }: { data: any; refetch: Function } = useAbstractProvider(
    TodoApi.getAllTodosGroupedByDate,
  );

  const {
    data: getAllQaasGroupedByDateData,
  }: { data: any; refetch: Function } = useAbstractProvider(
    QaaApi.getAllQaasGroupedByDate,
  );

  const {
    data: getAllBlogsGroupedByDateData,
    refetch: getAllBlogsGroupedByDate,
  }: { data: any; refetch: Function } = useAbstractProvider(
    BlogApi.getAllBlogsGroupedByDate,
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
