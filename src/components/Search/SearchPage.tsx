import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAbstractProvider from '../../providers/AbstractProvider';
import AppApi from '../../api/app';
import CustomLayout from '../layout/CustomLayout';
import ProtectedPage from '../ProtectedPage';
import moment from 'moment';
import './SearchPage.css';

const SearchPage = () => {
  const [search, setSearch] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [text, setText] = useState<string>();
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchFetch(search);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setText(selectedItem.text);
    }
  }, [selectedItem]);
  return (
    <ProtectedPage>
      <CustomLayout>
        <Box mt="20px">
          <InputGroup>
            <Input
              className="search_input"
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
              onClick={() => searchFetch(search)}
              ml="10px"
            >
              Search
            </Button>
          </InputGroup>
          {searchData?.length > 0 ? (
            <Flex mt="20px">
              <Box width="30%">
                <Text fontSize="lg">Result:</Text>
                {searchData?.map((item: any) => (
                  <Box
                    height="50px"
                    onClick={() => setSelectedItem(item)}
                    borderBottom="2px solid white"
                    cursor="pointer"
                  >
                    <Box className="searchText" whiteSpace="break-spaces">
                      {item.table_name} - {item.text}
                    </Box>
                    <Text>
                      {moment
                        .tz(item.created_at, 'Asia/Manila')
                        .format('DD.MM.YYYY HH:mm')}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box width="70%" ml="30px">
                <Textarea
                  placeholder="text"
                  rows={15}
                  border="2px solid white"
                  value={text}
                  onChange={(evt) => setText(evt.target.value)}
                />
              </Box>
            </Flex>
          ) : null}
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default SearchPage;
