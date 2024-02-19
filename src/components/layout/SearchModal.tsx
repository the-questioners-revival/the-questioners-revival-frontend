import {
  Button,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import CustomModal from '../custom/CustomModal';
import { useState } from 'react';
import useAbstractProvider from '../../providers/AbstractProvider';
import AppApi from '../../api/app';

const SearchModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) => {
  const [search, setSearch] = useState<string>();
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

  return (
    <CustomModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <ModalHeader>Search</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <InputGroup>
          <Input
            placeholder="Search phrase"
            fontSize="lg"
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
          <div>
            <Text fontSize="lg">Result:</Text>
            {searchData?.map((item: any) => (
              <div>
                {item.table_name} - {item.text}
              </div>
            ))}
          </div>
        ) : null}
      </ModalBody>
    </CustomModal>
  );
};

export default SearchModal;
