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

  return (
    <Flex justifyContent="space-between" bgColor="white" color="black"
      border="2px solid white"
      borderRadius="10"
      padding="5px 10px"
    >
      <Box w="100%">
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
      </Box>
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
          <EditIcon w={4} h={4} color="black" />
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
          <CloseIcon w={4} h={4} color="black" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReviewListItem;
