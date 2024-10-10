import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import DOMPurify from 'dompurify';
import CustomModal from '../custom/CustomModal';
import CreateBlogForm from '../Blog/CreateBlogForm';
import BlogsProvider from '../../providers/BlogsProvider';
import EditBlogForm from '../Blog/EditBlogForm';
import DatePicker from '../DatePicker/DatePicker';

const defaultTodo: Todo = {
  id: 0,
  title: '',
  type: '',
  priority: '',
  status: '',
  blog: null,
  created_at: new Date(),
  updated_at: new Date(),
  completed_at: new Date(),
  deleted_at: new Date(),
};

interface Todo {
  id: number;
  title: string;
  type: string;
  priority: string;
  status: string;
  blog: any;
  created_at: Date;
  updated_at: Date;
  completed_at: Date;
  deleted_at: Date;
}

const TodoListItem = ({
  todo,
  completeTodo,
  inprogressTodo,
  setTodoSelected,
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
  isOpenDeleteTodoModal,
  setIsOpenDeleteTodoModal,
  isOpenAnswer,
  openAnswer,
  createBlog,
  editBlog,
}: {
  todo: any;
  completeTodo: Function;
  inprogressTodo: Function;
  setTodoSelected: Function;
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: Function;
  isOpenDeleteTodoModal: boolean;
  setIsOpenDeleteTodoModal: Function;
  isOpenAnswer: boolean;
  openAnswer: Function;
  createBlog: Function;
  editBlog: Function;
}) => {
  const bgColor = useColorModeValue('white', 'black');
  const itemBgColor = useColorModeValue('greenLight', 'black');
  const LEFT_SIDE_WIDTH = 40;
  const RIGHT_SIDE_WIDTH = 80;
  const [startLeftSide, setStartLeftSide] = useState(0);
  const [startRightSide, setStartRightSide] = useState(0);
  const [leftSide, setLeftSide] = useState(-LEFT_SIDE_WIDTH);
  const [rightSide, setRightSide] = useState(-RIGHT_SIDE_WIDTH);
  const [isOpenCreateNoteModal, setIsOpenCreateNoteModal] = useState(false);
  const [isOpenEditNoteModal, setIsOpenEditNoteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(defaultTodo);
  const [scheduleTodo, setScheduleTodo] = useState<boolean>(false);

  const dragImg = new Image(0, 0);
  dragImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function handleOnDragStart(e: any) {
    if (e.type === 'touchstart') {
      const touch = e.touches[0];
      setStartLeftSide(touch.clientX);
      setStartRightSide(touch.clientX);
    } else {
      e?.dataTransfer?.setDragImage(dragImg, 0, 0);
      setStartLeftSide(e.clientX);
      setStartRightSide(e.clientX);
    }
  }

  function onDrag(e: any) {
    let clientX;

    if (e.type === 'touchmove') {
      const touch = e.touches[0];
      clientX = touch.clientX;
    } else {
      clientX = e.clientX;
    }

    let newCheckX = -LEFT_SIDE_WIDTH + (clientX - startLeftSide);
    let newCheckY = -RIGHT_SIDE_WIDTH + (startRightSide - clientX);
    if (newCheckX <= -LEFT_SIDE_WIDTH) {
      newCheckX = -LEFT_SIDE_WIDTH;
    }

    setLeftSide(newCheckX > 0 ? 0 : newCheckX);
    setRightSide(newCheckY > 0 ? 0 : newCheckY);

    e?.dataTransfer?.setData('text', e.target.id);
  }

  function onDragEnd(e: any) {
    if (leftSide >= 0) {
      if (
        todo.status === TODO_STATUS.COMPLETED ||
        todo.status === TODO_STATUS.REMOVED
      ) {
        inprogressTodo(todo?.id);
      } else {
        completeTodo(todo?.id);
      }
    } else {
    }
    let myVar2 = setInterval(() => {
      setLeftSide((prevState) => {
        if (prevState < -LEFT_SIDE_WIDTH) {
          clearInterval(myVar2);
          return prevState;
        }

        return prevState - 1;
      });
    }, 10);
    if (rightSide >= 0) {
      // this.deleteTask();
    } else {
      let myVar = setInterval(() => {
        setRightSide((prevState) => {
          if (prevState < -RIGHT_SIDE_WIDTH) {
            clearInterval(myVar);
            return prevState;
          }

          return prevState - 1;
        });
      }, 10);
    }
  }
  function renderBg(status: string) {
    if (status === TODO_STATUS.IN_PROGRESS) {
      return itemBgColor;
    }
    if (status === TODO_STATUS.REMOVED) {
      return '#E03C3C';
    }
    // if(status===TODO_STATUS.COMPLETED) {
    //   return
    // }
  }

  function makeUrlsClickable(text: string) {
    // Regular expression to find URLs starting with https:// or http://
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Replace URLs with clickable links
    return text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noreferrer" style="text-decoration: underline">$1</a>',
    );
  }

  function renderTodoTitle(title: string) {
    const clickableTitle = makeUrlsClickable(title);
    const sanitizedTitle = DOMPurify.sanitize(clickableTitle, {
      ADD_ATTR: ['target'],
    });
    return sanitizedTitle;
  }

  return (
    <>
      <Box
        key={todo.id}
        marginBottom="10px"
        border={`2px solid ${bgColor}`}
        borderRadius="10"
        overflow="hidden"
        _hover={{ cursor: 'pointer' }}
        draggable={true}
        onDragStart={(e) => handleOnDragStart(e)}
        onDragOver={(e) => onDrag(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onTouchStart={(e) => handleOnDragStart(e)}
        onTouchMove={(e) => onDrag(e)}
        onTouchEnd={(e) => onDragEnd(e)}
        background={renderBg(todo.status)}
        style={{
          position: 'relative',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#04A144',
            height: '100%',
            width: LEFT_SIDE_WIDTH,
            left: leftSide,
            top: 0,
            zIndex: 1,
          }}
        >
          <CheckIcon />
        </Box>
        <Box
          w="100%"
          padding="5px 10px"
          style={{
            position: 'relative',
          }}
          onClick={() => rightSide < 0 && openAnswer(todo.id)}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Text
                fontSize="lg"
                paddingRight="7px"
                textDecorationLine={`${
                  todo.status === TODO_STATUS.COMPLETED ? 'line-through' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: renderTodoTitle(todo.title),
                }}
              ></Text>
              {todo.blog_id ? (
                <Box
                  marginRight="2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenEditNoteModal(!isOpenEditNoteModal);
                    setSelectedTodo(todo);
                  }}
                >
                  📝
                </Box>
              ) : null}
            </Box>
            <Flex>
              <Box paddingRight="7px">
                <Tag>{todo.type}</Tag>
              </Box>
              {todo.priority ? (
                <Box>
                  <Tag>{todo.priority}</Tag>
                </Box>
              ) : null}
            </Flex>
          </Box>
        </Box>
        <Box
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: 'red',
            height: '100%',
            width: RIGHT_SIDE_WIDTH,
            right: rightSide,
            top: 0,
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            onClick={() => {
              setIsOpenEditTodoModal(true);
              setTodoSelected(todo);
            }}
          >
            <EditIcon w={4} h={4} color={bgColor} />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            onClick={() => {
              setIsOpenDeleteTodoModal(true);
              setTodoSelected(todo);
            }}
          >
            <CloseIcon w={4} h={4} color={bgColor} />
          </Flex>
        </Box>
        <Box display={isOpenAnswer ? 'block' : 'none'} padding="5px 10px">
          {!todo.blog_id ? (
            <div
              onClick={() => {
                setIsOpenCreateNoteModal(!isOpenCreateNoteModal);
                setSelectedTodo(todo);
              }}
            >
              ✍️
            </div>
          ) : null}
          {scheduleTodo ? (
            <Box display="flex">
              <DatePicker />
              <Button
                marginLeft={2}
                display="flex"
                colorScheme="teal"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          ) : (
            <Text fontSize="xs" onClick={() => setScheduleTodo(!scheduleTodo)}>
              schedule todo
            </Text>
          )}
          <Text fontSize="sm" paddingRight="7px">
            created:{' '}
            {moment
              .tz(todo.created_at, 'Asia/Manila')
              .format('DD.MM.YYYY HH:mm')}
          </Text>
          {todo.completed_at ? (
            <Text fontSize="sm" paddingRight="7px">
              completed:{' '}
              {moment
                .tz(todo.completed_at, 'Asia/Manila')
                .format('DD.MM.YYYY HH:mm')}
            </Text>
          ) : null}
          {todo.updated_at ? (
            <Text fontSize="sm" paddingRight="7px">
              updated:{' '}
              {moment
                .tz(todo.updated_at, 'Asia/Manila')
                .format('DD.MM.YYYY HH:mm')}
            </Text>
          ) : null}
          {todo.deleted_at ? (
            <Text fontSize="sm" paddingRight="7px">
              removed:{' '}
              {moment
                .tz(todo.removed_at, 'Asia/Manila')
                .format('DD.MM.YYYY HH:mm')}
            </Text>
          ) : null}
        </Box>
      </Box>
      <CustomModal
        isOpen={isOpenCreateNoteModal}
        closeModal={() => setIsOpenCreateNoteModal(false)}
      >
        <ModalHeader>Create Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateBlogForm
            date={selectedTodo.created_at}
            createBlog={(blog: any) => {
              createBlog({ ...blog, todo_id: selectedTodo.id });
              setIsOpenCreateNoteModal(false);
            }}
          ></CreateBlogForm>
        </ModalBody>
      </CustomModal>
      <CustomModal
        isOpen={isOpenEditNoteModal}
        closeModal={() => setIsOpenEditNoteModal(false)}
      >
        <ModalHeader>Edit Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditBlogForm
            blog={selectedTodo.blog}
            editBlog={(blog: any) => {
              editBlog(blog);
              setIsOpenEditNoteModal(false);
            }}
          ></EditBlogForm>
        </ModalBody>
      </CustomModal>
    </>
  );
};

export default TodoListItem;
