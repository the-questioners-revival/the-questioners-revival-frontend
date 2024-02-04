import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Tag, Text } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';
import { useEffect, useRef, useState } from 'react';

const QaaListItem = ({
  qaa,
  setQaaSelected,
  isOpenEditQaaModal,
  setIsOpenEditQaaModal,
  isOpenDeleteQaaModal,
  setIsOpenDeleteQaaModal,
  isOpenAnswer,
  openAnswer,
}: {
  qaa: any;
  setQaaSelected: Function;
  isOpenEditQaaModal: boolean;
  setIsOpenEditQaaModal: Function;
  isOpenDeleteQaaModal: boolean;
  setIsOpenDeleteQaaModal: Function;
  isOpenAnswer: boolean;
  openAnswer: Function;
}) => {
  const Y_WIDTH = 80;
  const [startY, setStartY] = useState(0);
  const [checkY, setCheckY] = useState(-Y_WIDTH);

  const dragImg = new Image(0, 0);
  dragImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function handleOnDragStart(e: any) {
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    setStartY(e.clientX);
  }

  function ondrag(e: any) {
    let newCheckY = -Y_WIDTH + (startY - e.clientX);
    setCheckY(newCheckY > 0 ? 0 : newCheckY);

    e.dataTransfer.setData('text', e.target.id);
    // e.dataTransfer.setDragImage(img, 0, 0)
  }

  function ondragend(e: any) {
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

  function renderBg(deleted_at: string) {
    if (deleted_at === null) {
      return '#4CAF4F';
    } else {
      return '#E03C3C';
    }
  }

  return (
    <Box
      key={qaa.id}
      marginBottom="10px"
      border="2px solid white"
      borderRadius="10"
      bg={renderBg(qaa.deleted_at)}
      overflow="hidden"
      _hover={{ cursor: 'pointer' }}
      draggable={true}
      onDragStart={(e) => handleOnDragStart(e)}
      onDragOver={(e) => ondrag(e)}
      onDragEnd={(e) => ondragend(e)}
      style={{
        position: 'relative',
      }}
    >
      <Box
        padding="5px 10px"
        display="flex"
        alignItems="center"
        w="100%"
        style={{
          position: 'relative',
        }}
        onClick={() => checkY < 0 && openAnswer(qaa.id)}
      >
        <Text
          fontSize="lg"
          paddingRight="7px"
          textDecorationLine={`${
            qaa.status === TODO_STATUS.COMPLETED ? 'line-through' : ''
          }`}
        >
          {qaa.question}
        </Text>
        <Tag>{qaa.type}</Tag>
       
      </Box>
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
            top: 0
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            onClick={() => {
              setIsOpenEditQaaModal(true);
              setQaaSelected(qaa);
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
              setIsOpenDeleteQaaModal(true);
              setQaaSelected(qaa);
            }}
          >
            <CloseIcon w={4} h={4} color="white" />
          </Flex>
        </Box>
      <Box display={isOpenAnswer ? 'block' : 'none'} padding="5px 10px">
        <Text fontSize="lg" paddingRight="7px">
          {qaa.answer}
        </Text>
        {qaa.link ? (
          <Flex>
            <Text fontSize="lg" paddingRight="7px">
              source:{' '}
            </Text>
            <Link href={qaa.link} isExternal fontSize="lg" paddingRight="7px">
              {qaa.link}
            </Link>
          </Flex>
        ) : null}
      </Box>
    </Box>
  );
};

export default QaaListItem;
