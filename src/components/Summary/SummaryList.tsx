import {
  Box,
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Switch,
  Tag,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import CustomModal from '../custom/CustomModal';
import CreateBlogForm from '../Blog/CreateBlogForm';
import { useState } from 'react';
import EditBlogForm from '../Blog/EditBlogForm';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import './SummaryList.css';
import { getDayOfWeekString } from '../Habits/HabitsPage';
import Blog from './Blog';

const SummaryList = ({
  data,
  createBlog,
  editBlog,
  removeBlog,
  dailyHabits,
  dailyHabitsTrackers,
  createHabitsTracker,
  deleteHabitsTracker,
}: {
  data: any;
  createBlog: Function;
  editBlog: Function;
  removeBlog: Function;
  dailyHabits: any;
  dailyHabitsTrackers: any;
  createHabitsTracker: Function;
  deleteHabitsTracker: Function;
}) => {
  const [isOpenCreateBlogModal, setIsOpenCreateBlogModal] = useState(false);
  const [isOpenEditBlogModal, setIsOpenEditBlogModal] = useState(false);
  const [isOpenDeleteBlogModal, setIsOpenDeleteBlogModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  function isChecked(habit: any, dataByDate: any) {
    const habitsTrackerFound = dailyHabitsTrackers?.find(
      (habitTracker: any) =>
        habitTracker.habit_id === habit.id &&
        habitTracker?.created_at?.slice(0, 10) ===
          dataByDate?.date?.slice(0, 10),
    );

    if (habitsTrackerFound) {
      return habitsTrackerFound;
    } else {
      return null;
    }
  }

  return (
    <Box>
      <Heading as="h1" fontSize="2xl" marginBottom="20px">
        Summary List
      </Heading>
      <Box>
        {data?.map((dataByDate: any) => {
          const now = new Date();
          const isItToday =
            moment.tz(now, 'Asia/Manila').format('DD.MM.YYYY') ===
            moment.tz(dataByDate.date, 'Asia/Manila').format('DD.MM.YYYY');

          return (
            <Box
              key={dataByDate.date}
              marginBottom="15px"
              border={`${isItToday ? '2px solid #FFDF00' : '2px solid white'}`}
              borderRadius="10"
              padding="10px"
            >
              <Heading as="h1" fontSize="xl">
                {getDayOfWeekString(new Date(dataByDate?.date))} -{' '}
                {moment(dataByDate?.date).format('DD MMMM YYYY')}{' '}
                {isItToday ? '(TODAY)' : null}
              </Heading>
              {dataByDate?.todos?.length > 0 ? (
                <Heading
                  as="h2"
                  fontSize="lg"
                  marginTop="10px"
                  textDecoration="underline"
                >
                  {dataByDate?.todos?.length} Todos:
                </Heading>
              ) : null}
              {dataByDate?.todos?.map((todo: any) => (
                <Box
                  key={todo.id}
                  display="flex"
                  alignItems="center"
                  w="100%"
                  style={{
                    position: 'relative',
                  }}
                >
                  <Text fontSize="md" paddingRight="7px">
                    {todo.title}
                  </Text>
                  <Box>
                    <Tag>{todo.type}</Tag>
                  </Box>
                </Box>
              ))}
              {dataByDate?.qaas?.length > 0 ? (
                <Heading
                  as="h2"
                  fontSize="lg"
                  marginTop="10px"
                  textDecoration="underline"
                >
                  {dataByDate?.qaas?.length} QaAs:
                </Heading>
              ) : null}

              {dataByDate?.qaas?.map((qaa: any) => (
                <Box
                  key={qaa.id}
                  display="flex"
                  alignItems="center"
                  w="100%"
                  style={{
                    position: 'relative',
                  }}
                >
                  <Text fontSize="md" paddingRight="7px">
                    {qaa.question}
                  </Text>
                  <Box>
                    <Tag>{qaa.type}</Tag>
                  </Box>
                </Box>
              ))}
              {dataByDate?.blogs?.length > 0 ? (
                <Heading
                  as="h2"
                  fontSize="lg"
                  marginTop="10px"
                  textDecoration="underline"
                >
                  {dataByDate?.blogs?.length} Blogs:
                </Heading>
              ) : null}

              {dataByDate?.blogs?.map((blog: any) => (
                <Blog
                  key={`${dataByDate.date}-${blog.id}`}
                  blog={blog}
                  setSelectedItem={setSelectedItem}
                  setIsOpenEditBlogModal={setIsOpenEditBlogModal}
                  setIsOpenDeleteBlogModal={setIsOpenDeleteBlogModal}
                />
              ))}
              <Box>
                {dailyHabits?.map((habit: any) => {
                  const checked = isChecked(habit, dataByDate);

                  return (
                    <Flex key={habit.key}>
                      <Text>{habit.title}</Text>
                      <Switch
                        id="email-alerts"
                        isChecked={checked ? true : false}
                        onChange={(e) =>
                          e.target.checked === true
                            ? createHabitsTracker({
                                habit_id: habit.id,
                                created_at: dataByDate?.date,
                              })
                            : deleteHabitsTracker(checked ? checked.id : null)
                        }
                      />
                    </Flex>
                  );
                })}
              </Box>

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
          );
        })}
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
