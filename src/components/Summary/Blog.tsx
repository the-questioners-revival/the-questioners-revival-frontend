import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { sanitize } from 'dompurify';

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
  const bgColor = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const [showBlogText, setShowBlogText] = useState(false);

  return (
    <Flex justifyContent="space-between" position="relative">
      <Box>
        <div
          className={showBlogText ? 'tiptap' : 'tiptap blogText'}
          onClick={() => setShowBlogText(!showBlogText)}
          dangerouslySetInnerHTML={{
            __html: sanitize(blog?.text),
          }}
        ></div>
      </Box>
      <Flex position="absolute" right="0px">
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
          <EditIcon w={4} h={4} color={color} />
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
          <CloseIcon w={4} h={4} color={color} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Blog;
