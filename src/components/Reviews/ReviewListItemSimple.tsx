import { Box, Flex, Switch, Tag, Text } from '@chakra-ui/react';
import { sanitize } from 'dompurify';
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
      <Box>
        <div
          className={showReviewText ? 'tiptap' : 'tiptap blogText'}
          onClick={() => setShowReviewText(!showReviewText)}
          dangerouslySetInnerHTML={{
            __html: sanitize(review?.text),
          }}
        ></div>
        <Box>
          <Tag h="fit-content">{review.type}</Tag>
        </Box>
      </Box>
    </Flex>
  );
};

export default ReviewListItemSimple;
