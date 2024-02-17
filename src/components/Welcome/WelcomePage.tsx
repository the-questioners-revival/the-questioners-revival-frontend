import useAbstractProvider from '../../providers/AbstractProvider';
import AppApi from '../../api/app';
import {
  Box,
  Button,
  Flex,
  Select,
  Skeleton,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import { useEffect, useState } from 'react';
import { useUser } from '../../providers/UserProvider';
import './WelcomePage.css';

interface Quote {
  quote: string;
  author: string;
}

export const typeOptions = [
  {
    value: 'default',
    name: 'Default',
  },
  {
    value: 'stoic',
    name: 'Stoic',
  },
  {
    value: 'motivational',
    name: 'Motivational',
  },
  {
    value: 'entrepreneur',
    name: 'Entrepreneur',
  },
  {
    value: 'coding',
    name: 'Coding',
  },
  {
    value: 'affirmations',
    name: 'Affirmations',
  },
  {
    value: 'affirmations2',
    name: 'Affirmations 2',
  },
];

const TodoPage = () => {
  const [quote, setQuote] = useState<Quote>();
  const [type, setType] = useState<any>();
  const { user } = useUser();

  const {
    data: getRandomQuoteData,
    refetch: getRandomQuote,
    loading: getRandomQuoteLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    AppApi.getRandomQuote,
    null,
    false,
  );

  useEffect(() => {
    if (getRandomQuoteData) {
      setQuote(getRandomQuoteData);
    }
  }, [getRandomQuoteData]);

  useEffect(() => {
    console.log('type changed');

    getRandomQuote(type);
  }, [type]);

  useEffect(() => {
    console.log('on load');
  }, []);

  return (
    // <ProtectedPage>
    <CustomLayout>
      <Flex alignItems="center" height="100%" justifyContent="space-between">
        <Box width="100%">
          <Text fontSize="2xl">Welcome back, {user?.username}!</Text>
          {!getRandomQuoteLoading && quote ? (
            <Box maxWidth="600px">
              <div className="quote">
                <blockquote>
                  <Text fontSize="3xl">"{quote.quote}"</Text>
                  <cite>{quote.author}</cite>
                </blockquote>
              </div>
            </Box>
          ) : (
            <SkeletonText
              mt="4"
              mb="2"
              noOfLines={4}
              spacing="2"
              skeletonHeight="5"
              maxWidth="600px"
              width="100%"
            />
          )}
          <Box>
            <Select
              value={type}
              onChange={(evt) => setType(evt.target.value)}
              color="black"
              bg="white"
              width="fit-content"
            >
              {typeOptions?.map((option) => (
                <option key={option.name} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={getRandomQuoteLoading}
              onClick={() => getRandomQuote(type)}
            >
              New Quote
            </Button>
          </Box>
        </Box>
      </Flex>
    </CustomLayout>
    // </ProtectedPage>
  );
};

export default TodoPage;
