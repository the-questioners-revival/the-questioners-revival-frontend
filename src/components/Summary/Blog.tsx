import { Box, Flex, Text } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Blog = ({
  blog,
  setIsOpenEditBlogModal,
  setIsOpenDeleteBlogModal,
  setSelectedItem,
}: {
  blog: any;
  setIsOpenEditBlogModal: Function;
  setIsOpenDeleteBlogModal: Function;
  setSelectedItem: Function;
}) => {
  const [showBlogText, setShowBlogText] = useState(false);

  return (
    <Flex justifyContent="space-between">
      <Box>
        <Text
          fontSize="md"
          whiteSpace="break-spaces"
          wordBreak="break-word"
          className={showBlogText ? '' : 'blogText'}
          onClick={() => setShowBlogText(!showBlogText)}
        >
          {blog?.text}
        </Text>
      </Box>
      <Flex>
        <Flex
          w="100%"
          h="100%"
          cursor="pointer"
          onClick={() => {
            setSelectedItem(blog);
            setIsOpenEditBlogModal(true);
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
            setSelectedItem(blog);
            setIsOpenDeleteBlogModal(true);
          }}
        >
          <CloseIcon w={4} h={4} color="white" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Blog;
