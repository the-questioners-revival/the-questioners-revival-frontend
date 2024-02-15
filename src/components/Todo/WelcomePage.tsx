import useAbstractProvider from '../../providers/AbstractProvider';
import AppApi from '../../api/app';
import { Box, Button, Flex, Select, Text } from '@chakra-ui/react';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import { useEffect, useState } from 'react';
import { useUser } from '../../providers/UserProvider';

interface Quote {
  quote: string;
  author: string;
}

export const typeOptions = [
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
  );

  useEffect(() => {
    if (getRandomQuoteData) {
      setQuote(getRandomQuoteData);
    }
  }, [getRandomQuoteData]);

  useEffect(() => {
    getRandomQuote(type);
  }, [type]);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Flex alignItems="center" height="100%" justifyContent="space-between">
          <Box>
            <Text fontSize="2xl">Welcome back, {user?.username}!</Text>
            {quote ? (
              <Box>
                <Text fontSize="3xl">{quote.quote}</Text>
                <Text fontSize="xl">-{quote.author}</Text>
              </Box>
            ) : null}
            <Box>
              <Select
                value={type}
                onChange={(evt) => setType(evt.target.value)}
                placeholder="Type"
                color="black"
                bg="white"
                marginBottom="10px"
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
    </ProtectedPage>
  );
};

export default TodoPage;
