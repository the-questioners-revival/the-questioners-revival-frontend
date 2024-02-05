import {
  Box,
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';
import moment from 'moment';
import CustomModal from '../custom/CustomModal';
import CreateBlogForm from '../Blog/CreateBlogForm';
import { useState } from 'react';
import EditBlogForm from '../Blog/EditBlogForm';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';

const SummaryList = ({
  data,
  createBlog,
  editBlog,
  removeBlog,
}: {
  data: any;
  createBlog: Function;
  editBlog: Function;
  removeBlog: Function;
}) => {
  const [isOpenCreateBlogModal, setIsOpenCreateBlogModal] = useState(false);
  const [isOpenEditBlogModal, setIsOpenEditBlogModal] = useState(false);
  const [isOpenDeleteBlogModal, setIsOpenDeleteBlogModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  return (
    <Box>
      <Heading as="h1" fontSize="2xl" marginBottom="20px">
        Summary List
      </Heading>
      <Box>
        {data?.map((dataByDate: any) => (
          <Box
            key={dataByDate.date}
            marginBottom="15px"
            border="2px solid white"
            borderRadius="10"
            padding="10px"
          >
            <Heading as="h2" fontSize="xl">
              {moment(dataByDate?.date).format('DD.MM.YYYY HH:mm')}
            </Heading>
            {dataByDate?.todos?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                Todos:
              </Heading>
            ) : null}
            {dataByDate?.todos?.map((todo: any) => (
              <Box key={todo.id}>{todo?.title}</Box>
            ))}
            {dataByDate?.qaas?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                QaAs:
              </Heading>
            ) : null}

            {dataByDate?.qaas?.map((qaa: any) => (
              <Box key={qaa.id}>{qaa?.question}</Box>
            ))}
            {dataByDate?.blogs?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                Blogs:
              </Heading>
            ) : null}

            {dataByDate?.blogs?.map((blog: any) => (
              <Flex justifyContent="space-between" key={blog.id}>
                <Box whiteSpace="break-spaces">{blog?.text}</Box>
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
            ))}

            <Button
              mt={4}
              display="flex"
              colorScheme="teal"
              type="submit"
              onClick={() => {
                setSelectedItem(dataByDate);
                setIsOpenCreateBlogModal(true);
              }}
            >
              Add Blog
            </Button>
          </Box>
        ))}
      </Box>
      <CustomModal
        isOpen={isOpenCreateBlogModal}
        closeModal={() => setIsOpenCreateBlogModal(false)}
      >
        <ModalHeader>New Blog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateBlogForm
            createBlog={(data: any) => {
              createBlog(data);
              setIsOpenCreateBlogModal(false);
            }}
            date={selectedItem?.date}
          />
        </ModalBody>
      </CustomModal>
      <CustomModal
        isOpen={isOpenEditBlogModal}
        closeModal={() => setIsOpenEditBlogModal(false)}
      >
        <ModalHeader>Edit Blog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditBlogForm
            editBlog={(data: any) => {
              editBlog(data);
              setIsOpenEditBlogModal(false);
            }}
            blog={selectedItem}
          />
        </ModalBody>
      </CustomModal>
      <CustomConfirmationModal
        isOpen={isOpenDeleteBlogModal}
        closeModal={() => setIsOpenDeleteBlogModal(false)}
        primaryAction={() => {
          removeBlog(selectedItem?.id);
          setIsOpenDeleteBlogModal(false);
        }}
        secondaryAction={() => {}}
        title={`Remove blog`}
        description={`Are you sure you want to remove blog with id ${selectedItem?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
    </Box>
  );
};

export default SummaryList;
