import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Flex,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import CategoryAccordion from './CategoryAccordion';
import EditableItemDetails from './EditableItemDetails';

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
  addCategory: (parentId: number, name: string) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  addCategory,
}) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  console.log('selectedItem: ', selectedItem);
  const [editedItem, setEditedItem] = useState<any | null>(null);
  const saveChanges = () => {
    if (editedItem) {
      setSelectedItem(editedItem);
      setEditedItem(null);
    }
  };

  const handleCancelClick = () => {
    setEditedItem(null);
  };

  return (
    <Flex>
      <Box flex="1" p={3} pl={0}>
        <CategoryAccordion
          categories={categories}
          addCategory={addCategory}
          setSelectedItem={(item) => {
            setSelectedItem(item);

            setEditedItem(item);
          }}
        />
      </Box>

      <Box flex="3" p={3} pr={0}>
        <EditableItemDetails
          selectedItem={selectedItem}
          editedItem={editedItem}
          setEditedItem={setEditedItem}
          saveChanges={saveChanges}
          handleCancelClick={handleCancelClick}
        />
      </Box>
    </Flex>
  );
};

export default CategoryTree;
