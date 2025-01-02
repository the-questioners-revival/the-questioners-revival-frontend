import { Heading, Box } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { useEffect, useState } from 'react';
import ProtectedPage from '../ProtectedPage';
import EditableItemDetails from '../Category/EditableItemDetails';
import TodosProvider from '../../providers/TodosProvider';
import QaasProvider from '../../providers/QaasProvider';
import BlogsProvider from '../../providers/BlogsProvider';
import { useParams } from 'react-router-dom';

const ItemsPage = () => {
  const { category, id } = useParams();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { editTodoData, editTodo, getTodoByIdData, getTodoByIdRefetch } = TodosProvider();

  const { editQaaData, editQaa, getQaaByIdData, getQaaByIdRefetch } = QaasProvider();

  const { editBlogData, editBlog, getBlogByIdData, getBlogByIdRefetch, } = BlogsProvider();

  useEffect(() => {
    if (editTodoData || editQaaData || editBlogData) {
      //      getLatestCategories();
    }
  }, [editTodoData, editQaaData, editBlogData]);

  useEffect(() => {
    if (id && category) {
      if (category === 'todos') {
        getTodoByIdRefetch(id)
      }
      if (category === 'qaas') {
        getQaaByIdRefetch(id)
      }
      if (category === 'blogs') {
        getBlogByIdRefetch(id)
      }
    }
  }, [id, category])

  useEffect(() => {
    if (getTodoByIdData) {
      setSelectedItem({ ...getTodoByIdData, table_name: 'todos' })
    }
  }, [getTodoByIdData])

  useEffect(() => {
    if (getQaaByIdData) {
      setSelectedItem({ ...getQaaByIdData, table_name: 'qaas' })
    }
  }, [getQaaByIdData])

  useEffect(() => {
    if (getBlogByIdData) {
      setSelectedItem({ ...getBlogByIdData, table_name: 'blogs' })
    }
  }, [getBlogByIdData])

  const saveChanges = (type: string, updatedValues: any) => {
    if (type === 'todo') {
      editTodo({ ...updatedValues });
    } else if (type === 'qaa') {
      editQaa({ ...updatedValues });
    } else if (type === 'blog') {
      editBlog({ ...updatedValues });
    }
    setSelectedItem(updatedValues);
  };

  return (
    <ProtectedPage>
      <CustomLayout maxWidth={false}>
        <Heading as="h2" size="lg" margin="20px 0px 10px 0px">
          Item
        </Heading>
        <Box>
          <EditableItemDetails
            selectedItem={selectedItem}
            saveChanges={saveChanges}
          />
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default ItemsPage;
