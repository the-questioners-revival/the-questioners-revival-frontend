import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import CategoryAccordion from './CategoryAccordion';
import EditableItemDetails from './EditableItemDetails';
import TodosProvider from '../../providers/TodosProvider';
import QaasProvider from '../../providers/QaasProvider';
import BlogsProvider from '../../providers/BlogsProvider';

interface Todo {
  id: number;
  title: string;
  type: string;
  priority: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  completed_at: Date;
  deleted_at: Date;
}

interface Qaa {
  id: number;
  question: string;
  answer: string;
  link: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface Blog {
  id: number;
  text: string;
  given_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  todo_id: number;
}

interface Category {
  id: number;
  name: string;
  children?: Category[];
  todos?: Todo[];
  qaas?: Qaa[];
  blogs?: Blog[];
}

interface CategoryTreeProps {
  categories: Category[];
  getLatestCategories: Function;
  addCategory: (parentId: number, name: string) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  getLatestCategories,
  addCategory,
}) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  console.log('selectedItem: ', selectedItem);
  const [editedItem, setEditedItem] = useState<any | null>(null);

  const { editTodoData, editTodo } = TodosProvider();

  const { editQaaData, editQaa } = QaasProvider();

  const { editBlogData, editBlog } = BlogsProvider();

  useEffect(() => {
    if (editTodoData || editQaaData || editBlogData) {
      getLatestCategories();
    }
  }, [editTodoData, editQaaData, editBlogData]);

  const saveChanges = (type: string, updatedValues: any) => {
    console.log('type: ', type);
    console.log('updatedValues: ', updatedValues);
    if (editedItem) {
      if (type === 'todo') {
        editTodo({ ...updatedValues });
      } else if (type === 'qaa') {
        editQaa({ ...updatedValues });
      } else if (type === 'blog') {
        editBlog({ ...updatedValues });
      }
      setSelectedItem(updatedValues);
      setEditedItem(updatedValues);
    }
  };


  return (
    <Flex
      direction={{ base: "column", md: "row" }}
    >
      <Box flex="1" p={3} pl={0} pt={0}>
        <CategoryAccordion
          categories={categories}
          addCategory={addCategory}
          setSelectedItem={(item) => {
            setSelectedItem(item);

            setEditedItem(item);
          }}
        />
      </Box>

      <Box flex="3" backgroundColor="white" borderRadius="5px" height='fit-content'>
        {selectedItem ?
          <Box p={3} pr={0} >

            <EditableItemDetails
              selectedItem={selectedItem}
              saveChanges={saveChanges}
            />
          </Box>
          : null}

      </Box>
    </Flex>
  );
};

export default CategoryTree;
