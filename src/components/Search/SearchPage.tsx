import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Tag,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import useAbstractProvider from '../../providers/AbstractProvider';
import AppApi from '../../api/app';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import moment from 'moment';
import './SearchPage.css';
import TodosProvider from '../../providers/TodosProvider';
import QaasProvider from '../../providers/QaasProvider';
import BlogsProvider from '../../providers/BlogsProvider';
import GoalsProvider from '../../providers/GoalsProvider';
import ReviewsProvider from '../../providers/ReviewsProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import EditableItemDetails from '../Category/EditableItemDetails';
import { sanitize } from 'dompurify';
import useEditorSettings from '../HtmlEditor/settings';

const SearchPage = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [search, setSearch] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [text, setText] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [link, setLink] = useState<string>();
  const [isListOpen, setIsListOpen] = useState(false);
  const inputRef = useRef<any>(null);

  const editor = useEditorSettings(answer, true);

  useEffect(() => {
    // When the component mounts, select the text inside the input
    inputRef.current.select();
  }, []);

  const {
    data: searchData,
    refetch: searchFetch,
    loading: searchLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    AppApi.search,
    null,
    false,
  );
  const { editTodo, editTodoData } = TodosProvider();
  const { editQaa, editQaaData } = QaasProvider();
  const { editBlog, editBlogData } = BlogsProvider();
  const { editGoal, editGoalData } = GoalsProvider();
  const { editReview, editReviewData } = ReviewsProvider();
  const { setLoading } = useFloatingLoader();

  function handleRefetchSearch() {
    searchFetch(search);
    setSelectedItem(null);
    setText('');
    setAnswer('');
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRefetchSearch();
    }
  };

  useEffect(() => {
    setLoading(searchLoading);
  }, [searchLoading]);

  useEffect(() => {
    if (searchData) {
      setIsListOpen(true);
    }
  }, [searchData]);

  const editItem = (type: string, updatedValues: any) => {
    if (selectedItem) {
      if (type === 'todo') {
        editTodo({ ...updatedValues });
      } else if (type === 'qaa') {
        editQaa({ ...updatedValues });
      } else if (type === 'blog') {
        editBlog({ ...updatedValues });
      }
      setSelectedItem(updatedValues);
    }
  };

  useEffect(() => {
    if (
      editTodoData ||
      editQaaData ||
      editBlogData ||
      editGoalData ||
      editReviewData
    ) {
      searchFetch(search);
    }
  }, [editTodoData, editQaaData, editBlogData, editGoalData, editReviewData]);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    if (item) {
      setText(item.text);
      if (item.table_name === 'qaas') {
        setAnswer(item.answer);
        editor?.commands.setContent(item.answer);
        setLink(item.link);
      }
      if (item.table_name === 'blogs' || item.table_name === 'reviews') {
        setText(item.text);
        editor?.commands.setContent(item.text);
      }
    }
    if (isMobile) {
      setIsListOpen(false);
    }
  };

  function renderTitle(item: any) {
    if (item.table_name === 'todos') {
      return (
        <Tooltip label={item.title} placement="top" hasArrow>
          <Box className="searchText" whiteSpace="break-spaces">
            {item.title}
          </Box>
        </Tooltip>
      );
    }
    if (item.table_name === 'qaas') {
      return (
        <Tooltip label={item.question} placement="top" hasArrow>
          <Box className="searchText" whiteSpace="break-spaces">
            {item.question}
          </Box>
        </Tooltip>
      );
    }
    if (item.table_name === 'blogs') {
      return (
        <Tooltip
          label={
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(item?.text),
              }}
            />
          }
          placement="top"
        >
          <Box className="searchText" whiteSpace="break-spaces">
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(item?.text),
              }}
            />
          </Box>
        </Tooltip>
      );
    }
    if (item.table_name === 'reviews' || item.table_name === 'goals') {
      return (
        <Tooltip label={item.text} placement="top" hasArrow>
          <Box className="searchText" whiteSpace="break-spaces">
            {item.text}
          </Box>
        </Tooltip>
      );
    }
  }

  function renderType(item: any) {
    return item.table_name;
  }

  return (
    <ProtectedPage>
      <CustomLayout maxWidth={false}>
        <Box mt="20px">
          <InputGroup>
            <Input
              ref={inputRef}
              className="input"
              placeholder="Search phrase"
              border="2px solid white"
              fontWeight="600"
              fontSize="lg"
              color="black"
              backgroundColor="white"
              onKeyDown={handleKeyPress}
              onChange={(evt) => setSearch(evt.target.value)}
              value={search}
            />
            <Button
              display="flex"
              colorScheme="teal"
              isLoading={searchLoading}
              type="submit"
              onClick={() => handleRefetchSearch()}
              ml="10px"
            >
              Search
            </Button>
          </InputGroup>
          <Box mt="20px">
            {searchData?.length > 0 || searchLoading ? (
              <Grid
                templateColumns={{
                  base: '100%',
                  md: '30% 1fr',
                }}
                width="100%"
                gap={6}
                height="100%"
              >
                <GridItem>
                  <Accordion
                    allowToggle
                    index={isListOpen ? 0 : -1}
                    backgroundColor="white"
                    color="black"
                    borderRadius="5px"
                  >
                    <AccordionItem border="none">
                      <h2>
                        <AccordionButton
                          onClick={() => setIsListOpen(!isListOpen)}
                        >
                          <Box flex="1" textAlign="left" fontWeight="600">
                            Result:
                          </Box>
                          <Box flex="1" textAlign="right">
                            {isListOpen ? '-' : '+'}
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        display={isListOpen ? 'block' : 'none'}
                      >
                        {/* Content of the list goes here */}
                        {searchData?.map((item: any) => (
                          <Box
                            key={item.id}
                            height="50px"
                            onClick={() => handleSelectItem(item)}
                            borderBottom="2px solid white"
                            cursor="pointer"
                            p="0px 5px"
                            bg={
                              selectedItem?.id === item.id &&
                              selectedItem.table_name === item.table_name
                                ? 'gray.300'
                                : ''
                            }
                          >
                            <Box display="flex">
                              <Box flex={1}>{renderTitle(item)}</Box>
                              <Box>
                                <Tag fontSize="xs">{renderType(item)}</Tag>
                              </Box>
                            </Box>
                            <Text>
                              {moment
                                .tz(item.created_at, 'Asia/Manila')
                                .format('DD.MM.YYYY')}
                            </Text>
                          </Box>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </GridItem>
                <GridItem
                  backgroundColor="white"
                  borderRadius="5px"
                  height="fit-content"
                >
                  {selectedItem ? (
                    <Box p={3}>
                      <EditableItemDetails
                        selectedItem={selectedItem}
                        saveChanges={editItem}
                      ></EditableItemDetails>
                    </Box>
                  ) : null}
                </GridItem>
              </Grid>
            ) : (
              <Text>No results</Text>
            )}
          </Box>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default SearchPage;
