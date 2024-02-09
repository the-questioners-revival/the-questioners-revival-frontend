import { Box, Flex, Switch, Tag, Text } from '@chakra-ui/react';

const ReviewListItemSimple = ({
  review,
  editReview,
}: {
  review: any;
  editReview: Function;
}) => {
  return (
    <Flex
      justifyContent="space-between"
      marginBottom="10px"
      border="2px solid white"
      borderRadius="10"
      padding="5px 10px"
    >
      <Flex>
        <Text marginRight="10px" whiteSpace="break-spaces">
          {review.text}
        </Text>
        <Box>
          <Tag h="fit-content">{review.type}</Tag>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ReviewListItemSimple;
