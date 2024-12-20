import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { sanitize } from 'dompurify';
import { useState } from 'react';

const ReviewListItem = ({
  review,
  setSelectedItem,
  setIsOpenEditReviewModal,
  setIsOpenDeleteReviewModal,
}: {
  review: any;
  setSelectedItem: any;
  setIsOpenEditReviewModal: Function;
  setIsOpenDeleteReviewModal: Function;
}) => {
  const [showReviewText, setShowReviewText] = useState(false);

  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Box marginRight="10px">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(review?.text),
            }}
          ></div>
        </Box>

        <Box>
          <Tag>{review.type}</Tag>
        </Box>
      </Flex>
      <Flex>
        <Flex
          w="100%"
          h="100%"
          cursor="pointer"
          onClick={() => {
            setSelectedItem(review);
            setIsOpenEditReviewModal(true);
          }}
          paddingRight="15px"
        >
          <EditIcon w={4} h={4} color="white" />
        </Flex>
        <Flex
          w="100%"
          h="100%"
          cursor="pointer"
          onClick={() => {
            setSelectedItem(review);
            setIsOpenDeleteReviewModal(true);
          }}
        >
          <CloseIcon w={4} h={4} color="white" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReviewListItem;
