import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment-timezone';

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
}) => {
  const LEFT_SIDE_WIDTH = 40;
  const RIGHT_SIDE_WIDTH = 80;
  const [startLeftSide, setStartLeftSide] = useState(0);
  const [startRightSide, setStartRightSide] = useState(0);
  const [leftSide, setLeftSide] = useState(-LEFT_SIDE_WIDTH);
  const [rightSide, setRightSide] = useState(-RIGHT_SIDE_WIDTH);

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
      return '#4CAF4F';
    }
    if (status === TODO_STATUS.REMOVED) {
      return '#E03C3C';
    }
    // if(status===TODO_STATUS.COMPLETED) {
    //   return
    // }
  }

  return (
    <Box
      key={todo.id}
      marginBottom="10px"
      border="2px solid white"
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
      style={{
        position: 'relative',
        backgroundColor: renderBg(todo.status),
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
        display="flex"
        alignItems="center"
        w="100%"
        padding="5px 10px"
        style={{
          position: 'relative',
        }}
        onClick={() => rightSide < 0 && openAnswer(todo.id)}
      >
        <Text
          fontSize="lg"
          paddingRight="7px"
          textDecorationLine={`${
            todo.status === TODO_STATUS.COMPLETED ? 'line-through' : ''
          }`}
        >
          {todo.title}
        </Text>
        <Tag>{todo.type}</Tag>
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
          <EditIcon w={4} h={4} color="white" />
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
          <CloseIcon w={4} h={4} color="white" />
        </Flex>
      </Box>
      <Box display={isOpenAnswer ? 'block' : 'none'} padding="5px 10px">
        <Text fontSize="sm" paddingRight="7px">
          created:{' '}
          {moment.tz(todo.created_at, 'Asia/Manila').format('DD.MM.YYYY HH:mm')}
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
  );
};

export default TodoListItem;
