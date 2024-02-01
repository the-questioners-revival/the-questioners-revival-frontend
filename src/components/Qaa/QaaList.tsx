import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Select, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';

const showOptions = [
  {
    name: 'true',
    value: 'true',
  },
  {
    name: 'false',
    value: 'false',
  },
];

const typeOptions = [
  {
    name: 'Personal',
    value: 'personal',
  },
  {
    name: 'Project',
    value: 'project',
  },
  {
    name: 'Work',
    value: 'work',
  },
];

const QaaList = ({
  qaas,
  removeQaa,
  type,
  setType,
  showRemoved,
  setShowRemoved,
}: {
  qaas: any;
  removeQaa: Function;
  type?: string;
  setType?: Function;
  showRemoved?: string;
  setShowRemoved?: Function;
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<[Number?]>([]);

  const handleItemClick = (itemId: any) => {
    setSelectedItemIds((prevSelectedIds: any) => {
      if (prevSelectedIds.includes(itemId)) {
        // If the item is already selected, remove it
        return prevSelectedIds.filter((id: any) => id !== itemId);
      } else {
        // If the item is not selected, add it
        return [...prevSelectedIds, itemId];
      }
    });
  };

  return (
    <Box paddingTop="15px">
      <Flex justifyContent="space-between">
        <Heading as="h2" size="lg">
          Qaas
        </Heading>
        <Flex>
          <Select
            value={showRemoved}
            onChange={(evt) =>
              setShowRemoved && setShowRemoved(evt.target.value)
            }
            placeholder="Show Removed"
            color="black"
            bg="white"
            marginRight="10px"
          >
            {showOptions?.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </Select>
          <Select
            value={type}
            onChange={(evt) => setType && setType(evt.target.value)}
            placeholder="Type"
            color="black"
            bg="white"
          >
            {typeOptions?.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Text>Number of qaas: {qaas?.length}</Text>
      {qaas?.map((qaa: any) => (
        <Box
          marginBottom="10px"
          border="2px solid white"
          borderRadius="10"
          _hover={{ cursor: 'pointer' }}
          key={qaa.id} // Added key prop
          padding="5px 10px"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              w="100%"
              onClick={() => handleItemClick(qaa?.id)}
            >
              {/* <CheckIcon w={4} h={4} color="black" /> */}
              <Text
                fontSize="lg"
                paddingRight="7px"
                textDecorationLine={`${qaa?.deleted_at ? 'line-through' : ''}`}
              >
                {qaa.question}
              </Text>
              <Tag>{qaa.type}</Tag>
            </Box>

            <Box>
              <CloseIcon
                w={4}
                h={4}
                color="white"
                onClick={() => removeQaa(qaa?.id)}
              />
            </Box>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              paddingRight="7px"
              display={selectedItemIds.includes(qaa?.id) ? 'block' : 'none'}
            >
              {qaa.answer}
            </Text>
            <Link href={qaa.link} isExternal fontSize="lg" paddingRight="7px">
              {qaa.link}
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default QaaList;
