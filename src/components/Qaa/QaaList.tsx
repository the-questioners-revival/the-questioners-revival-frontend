import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';

const QaaList = ({ qaas, removeQaa }: { qaas: any; removeQaa: Function }) => {
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
      <Heading as="h2" size="lg">
        Qaas
      </Heading>
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
              <Text fontSize="lg" paddingRight="7px">
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
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default QaaList;
