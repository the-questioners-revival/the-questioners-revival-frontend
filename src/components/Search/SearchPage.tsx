import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  SkeletonText,
  Text,
  Textarea,
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
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const SearchPage = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [search, setSearch] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [text, setText] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [link, setLink] = useState<string>();
  const [isListOpen, setIsListOpen] = useState(false);
  const inputRef = useRef<any>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'Editor',
      },
    },
    content: answer,
  });

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
    console.log('searchData: ', searchData);
    if (searchData) {
      setIsListOpen(true);
    }
  }, [searchData]);

  const editItem = () => {
    if (!selectedItem) return;
    const { id, table_name, column_name } = selectedItem;
    if (table_name === 'todos') {
      editTodo({ id, [column_name]: text });
    } else if (table_name === 'qaas') {
      editQaa({ id, [column_name]: text, answer: editor?.getHTML(), link });
    } else if (table_name === 'blogs') {
      editBlog({ id, [column_name]: editor?.getHTML() });
    } else if (table_name === 'goals') {
      editGoal({ id, [column_name]: text });
    } else if (table_name === 'reviews') {
      editReview({ id, [column_name]: editor?.getHTML() });
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

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box mt="20px">
          <InputGroup>
            <Input
              ref={inputRef}
              className="input"
              placeholder="Search phrase"
              border="2px solid white"
              fontWeight="600"
              fontSize="lg"
              textColor="white"
              color="white"
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
                  <Accordion allowToggle index={isListOpen ? 0 : -1}>
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
                            <Box
                              className="searchText"
                              whiteSpace="break-spaces"
                            >
                              {item.table_name} - {item.text}
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
                <GridItem>
                  {selectedItem?.table_name === 'qaas' ? (
                    <>
                      <FormLabel>Question</FormLabel>
                      <Input
                        className="input"
                        placeholder="Question"
                        border="2px solid white"
                        fontWeight="600"
                        fontSize="lg"
                        textColor="black"
                        mb="10px"
                        color="black"
                        background="white"
                        onChange={(evt) => setText(evt.target.value)}
                        value={text}
                      />
                      <FormLabel>Answer</FormLabel>
                      <Box background="white" color="black">
                        <HtmlEditor editor={editor} />
                      </Box>
                      <FormLabel>Link</FormLabel>
                      <Input
                        className="input"
                        placeholder="Link"
                        border="2px solid white"
                        fontWeight="600"
                        fontSize="lg"
                        textColor="black"
                        mb="10px"
                        color="black"
                        background="white"
                        onChange={(evt) => setLink(evt.target.value)}
                        value={link}
                      />
                    </>
                  ) : selectedItem?.table_name !== 'blogs' &&
                    selectedItem?.table_name !== 'reviews' ? (
                    <>
                      <FormLabel>Text</FormLabel>
                      <Textarea
                        className="input"
                        placeholder="text"
                        rows={15}
                        textColor="black"
                        color="black"
                        background="white"
                        fontWeight="600"
                        border="2px solid white"
                        value={text}
                        onChange={(evt) => setText(evt.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <FormLabel>Text</FormLabel>
                      <Box background="white" color="black">
                        <HtmlEditor editor={editor} />
                      </Box>
                    </>
                  )}

                  <Button
                    display="flex"
                    colorScheme="teal"
                    type="submit"
                    onClick={() => editItem()}
                    mt="10px"
                  >
                    Submit
                  </Button>
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
