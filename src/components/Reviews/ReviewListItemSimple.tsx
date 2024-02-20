import { Box, Flex, Switch, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';

const ReviewListItemSimple = ({
  review,
  editReview,
}: {
  review: any;
  editReview: Function;
}) => {
  const [showReviewText, setShowReviewText] = useState(false);

  return (
    <Flex
      justifyContent="space-between"
      marginBottom="10px"
      border="2px solid white"
      borderRadius="10"
      padding="5px 10px"
    >
      <Flex>
  
        <Text
          fontSize="md"
          whiteSpace="break-spaces"
          wordBreak="break-word"
          className={showReviewText ? '' : 'blogText'}
          onClick={() => setShowReviewText(!showReviewText)}
        >
          {review?.text}
        </Text>
        <Box>
          <Tag h="fit-content">{review.type}</Tag>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ReviewListItemSimple;
