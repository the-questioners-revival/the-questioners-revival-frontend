import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';
import { useEffect, useRef, useState } from 'react';

const TodoListItem = ({
  todo,
  completeTodo,
  inprogressTodo,
  setTodoSelected,
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
  isOpenDeleteTodoModal,
  setIsOpenDeleteTodoModal,
}: {
  todo: any;
  completeTodo: Function;
  inprogressTodo: Function;
  setTodoSelected: Function;
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: Function;
  isOpenDeleteTodoModal: boolean;
  setIsOpenDeleteTodoModal: Function;
}) => {
  const X_WIDTH = 40;
  const Y_WIDTH = 80;
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [checkX, setCheckX] = useState(-X_WIDTH);
  const [checkY, setCheckY] = useState(-Y_WIDTH);

  const dragImg = new Image(0, 0);
  dragImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function handleOnDragStart(e: any) {
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    setStartX(e.clientX);
    setStartY(e.clientX);
  }

  function ondrag(e: any) {
    let newCheckX = -X_WIDTH + (e.clientX - startX);
    let newCheckY = -Y_WIDTH + (startY - e.clientX);
    if (newCheckX <= -X_WIDTH) {
      newCheckX = -X_WIDTH;
    }
    setCheckX(newCheckX > 0 ? 0 : newCheckX);
    setCheckY(newCheckY > 0 ? 0 : newCheckY);

    e.dataTransfer.setData('text', e.target.id);
    // e.dataTransfer.setDragImage(img, 0, 0)
  }

  function ondragend(e: any) {
    if (checkX >= 0) {
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
      setCheckX((prevState) => {
        if (prevState < -X_WIDTH) {
          clearInterval(myVar2);
          return prevState;
        }

        return prevState - 1;
      });
    }, 10);
    if (checkY >= 0) {
      // this.deleteTask();
    } else {
      let myVar = setInterval(() => {
        setCheckY((prevState) => {
          if (prevState < -Y_WIDTH) {
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
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="10px"
      border="2px solid white"
      borderRadius="10"
      bg={renderBg(todo.status)}
      overflow="hidden"
      _hover={{ cursor: 'pointer' }}
      draggable={true}
      onDragStart={(e) => handleOnDragStart(e)}
      onDragOver={(e) => ondrag(e)}
      onDragEnd={(e) => ondragend(e)}
    >
      <Box
        display="flex"
        alignItems="center"
        w="100%"
        padding="5px 10px"
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
            background: 'green',
            height: '100%',
            width: X_WIDTH,
            left: checkX,
          }}
        >
          <CheckIcon></CheckIcon>
        </Box>
        {/* <CheckIcon w={4} h={4} color="black" /> */}
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
        <Box
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: 'red',
            height: '100%',
            width: Y_WIDTH,
            right: checkY,
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
      </Box>
    </Box>
  );
};

export default TodoListItem;
