import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Text,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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

const SearchPage = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [search, setSearch] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [text, setText] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [isListOpen, setIsListOpen] = useState(false);
  console.log('isListOpen: ', isListOpen);

  const {
    data: searchData,
    refetch: searchFetch,
    loading: searchLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    AppApi.search,
    null,
    false,
  );
  console.log('searchLoading: ', searchLoading);

  const { editTodo, editTodoData } = TodosProvider();

  const { editQaa, editQaaData } = QaasProvider();

  const { editBlog, editBlogData } = BlogsProvider();

  const { editGoal, editGoalData } = GoalsProvider();

  const { editReview, editReviewData } = ReviewsProvider();

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
      editQaa({ id, [column_name]: text, answer });
    } else if (table_name === 'blogs') {
      editBlog({ id, [column_name]: text });
    } else if (table_name === 'goals') {
      editGoal({ id, [column_name]: text });
    } else if (table_name === 'reviews') {
      editReview({ id, [column_name]: text });
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
            {searchData?.length > 0 ? (
              <Grid
                templateColumns={{
                  base: '100%',
                  md: '30% 70%',
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
                      <Input
                        className="input"
                        placeholder="Question"
                        border="2px solid white"
                        fontWeight="600"
                        fontSize="lg"
                        textColor="white"
                        mb="10px"
                        color="white"
                        onChange={(evt) => setText(evt.target.value)}
                        value={text}
                      />
                      <Textarea
                        className="input"
                        placeholder="text"
                        rows={15}
                        textColor="white"
                        color="white"
                        fontWeight="600"
                        border="2px solid white"
                        value={answer}
                        onChange={(evt) => setAnswer(evt.target.value)}
                      />
                    </>
                  ) : (
                    <Textarea
                      className="input"
                      placeholder="text"
                      rows={15}
                      textColor="white"
                      color="white"
                      fontWeight="600"
                      border="2px solid white"
                      value={text}
                      onChange={(evt) => setText(evt.target.value)}
                    />
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
