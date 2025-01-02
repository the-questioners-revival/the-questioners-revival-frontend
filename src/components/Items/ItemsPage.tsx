import { Text, Heading, Select, Box } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import { useEffect, useState } from 'react';
import ProtectedPage from '../ProtectedPage';
import CategoryApi from '../../api/category';
import useAbstractProvider from '../../providers/AbstractProvider';
import useAbstractMutator from '../../providers/AbstractMutator';
import EditableItemDetails from '../Category/EditableItemDetails';
import TodosProvider from '../../providers/TodosProvider';
import QaasProvider from '../../providers/QaasProvider';
import BlogsProvider from '../../providers/BlogsProvider';
import { useParams } from 'react-router-dom';

const ItemsPage = () => {
  const { category, id } = useParams();
  console.log('category: ', category)
  console.log('id: ', id)
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  console.log('selectedItem: ', selectedItem);
  const [editedItem, setEditedItem] = useState<any | null>(null);

  const { editTodoData, editTodo, getTodoByIdData, getTodoByIdRefetch } = TodosProvider();

  const { editQaaData, editQaa, getQaaByIdData, getQaaByIdRefetch } = QaasProvider();

  const { editBlogData, editBlog } = BlogsProvider();

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

  const saveChanges = (type: string, updatedValues: any) => {
    console.log('type: ', type);
    console.log('updatedValues: ', updatedValues);
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
