import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Text,
  Tag,
} from '@chakra-ui/react';
import { Category } from '../../types';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { sanitize } from 'dompurify';

interface CategoryAccordionProps {
  categories: Category[];
  addCategory: Function;
  setSelectedItem: (item: any) => void;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  categories,
  addCategory,
  setSelectedItem,
}) => {
  const handleAddCategory = (parentId: number | null) => {
    const categoryName = prompt('Enter category name');
    if (categoryName) addCategory(parentId, categoryName);
  };

  const renderCategories = (categories: Category[]) => {
    return categories?.map((category) => (
      <AccordionItem key={category.id} border={'0px'}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                {isExpanded ? (
                  <ChevronUpIcon fontSize="20px" />
                ) : (
                  <ChevronDownIcon fontSize="20px" />
                )}
                <Text
                  as="h2"
                  flex="1"
                  textAlign="left"
                  fontWeight={800}
                  fontSize="xs"
                >
                  {category.name}
                </Text>
                <Box
                  onClick={() => handleAddCategory(category.id)}
                  cursor="pointer"
                  fontSize="small"
                  pl={4}
                >
                  +
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} pt={0}>
              {/* Render child categories */}
              {category.children && renderCategories(category.children)}

              {/* Render todos */}
              {category.todos && category.todos.length > 0 && (
                <Box>
                  {category.todos.map((todo) => (
                    <Box
                      key={todo.id}
                      onClick={() => setSelectedItem(todo)}
                      cursor="pointer"
                      display="flex"
                      justifyContent="space-between"
                      paddingLeft="20px"
                      mt={3}
                      fontSize="xs"
                    >
                      {todo.title}{' '}
                      <Box>
                        <Tag>todo</Tag>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Render qaas */}
              {category.qaas && category.qaas.length > 0 && (
                <Box>
                  {category.qaas.map((qaa) => (
                    <Box
                      key={qaa.id}
                      onClick={() => setSelectedItem(qaa)}
                      cursor="pointer"
                      display="flex"
                      justifyContent="space-between"
                      paddingLeft="20px"
                      mt={3}
                      fontSize="xs"
                    >
                      {qaa.question}
                      <Box>
                        <Tag>qaa</Tag>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Render blogs */}
              {category.blogs && category.blogs.length > 0 && (
                <Box>
                  {category.blogs.map((blog) => (
                    <Box
                      key={blog.id}
                      onClick={() => setSelectedItem(blog)}
                      cursor="pointer"
                      display="flex"
                      justifyContent="space-between"
                      paddingLeft="20px"
                      mt={3}
                      fontSize="xs"
                    >
                      <div
                        className="tiptap"
                        dangerouslySetInnerHTML={{
                          __html: `${sanitize(blog?.text.slice(0, 15))}...`,
                        }}
                      ></div>
                      <Box>
                        <Tag>blog</Tag>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    ));
  };

  return (
    <>
      <Accordion
        allowMultiple
        backgroundColor="white"
        color="black"
        borderRadius="5px"
      >
        {renderCategories(categories)}
      </Accordion>

      <Button
        mt="10px"
        onClick={() => handleAddCategory(null)}
        cursor="pointer"
        fontSize="small"
        backgroundColor="white"
        color="black"
        borderRadius="5px"
      >
        add category
      </Button>
    </>
  );
};

export default CategoryAccordion;
