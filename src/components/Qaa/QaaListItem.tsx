import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import { TODO_STATUS } from '../../enums/todo-status';
import { useState } from 'react';
import moment from 'moment-timezone';
import { sanitize } from 'dompurify';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import useEditorSettings from '../HtmlEditor/settings';

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
  const editor = useEditorSettings(qaa?.answer, false);

  const bgColor = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");
  const RIGHT_SIDE_WIDTH = 80;
  const [startRightSide, setStartRightSide] = useState(0);
  const [rightSide, setRightSide] = useState(-RIGHT_SIDE_WIDTH);

  const dragImg = new Image(0, 0);
  dragImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  function handleOnDragStart(e: any) {
    if (e.type === 'touchstart') {
      const touch = e.touches[0];
      setStartRightSide(touch.clientX);
    } else {
      e?.dataTransfer?.setDragImage(dragImg, 0, 0);
      setStartRightSide(e.clientX);
    }
  }

  function onDrag(e: any) {
    let clientY;

    if (e.type === 'touchmove') {
      const touch = e.touches[0];
      clientY = touch.clientX;
    } else {
      clientY = e.clientX;
    }

    let newCheckY = -RIGHT_SIDE_WIDTH + (startRightSide - clientY);
    setRightSide(newCheckY > 0 ? 0 : newCheckY);

    e?.dataTransfer?.setData('text', e.target.id);
  }

  function onDragEnd(e: any) {
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

  function renderBg(deleted_at: string) {
    if (deleted_at === null) {
      return bgColor;
    } else {
      return '#E03C3C';
    }
  }

  return (
    <Box
      color={color}
      key={qaa.id}
      marginBottom="10px"
      border={`1.5px solid ${bgColor}`}
      borderRadius="10"
      bg={renderBg(qaa.deleted_at)}
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
      }}
    >
      <Box
        padding="5px 10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        style={{
          position: 'relative',
        }}
        onClick={() => rightSide < 0 && openAnswer(qaa.id)}
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
        <Box>
          <Tag>{qaa.type}</Tag>
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
      <HtmlEditor editor={editor} hideMenu/>

        {/* <div
          className="tiptap"
          dangerouslySetInnerHTML={{
            __html: sanitize(qaa?.answer),
          }}
        ></div> */}
        {qaa.link ? (
          <Flex>
            <Text fontSize="lg" paddingRight="7px">
              source:{' '}
            </Text>
            <Link
              href={qaa.link}
              isExternal
              fontSize="lg"
              paddingRight="7px"
              textDecor="underline"
              wordBreak="break-all"
            >
              {qaa.link}
            </Link>
          </Flex>
        ) : null}
        <Text fontSize="sm" paddingRight="7px">
          created:{' '}
          {moment.tz(qaa.created_at, 'Asia/Manila').format('DD.MM.YYYY HH:mm')}
        </Text>
        {qaa.updated_at ? (
          <Text fontSize="sm" paddingRight="7px">
            updated:{' '}
            {moment
              .tz(qaa.updated_at, 'Asia/Manila')
              .format('DD.MM.YYYY HH:mm')}
          </Text>
        ) : null}
        {qaa.deleted_at ? (
          <Text fontSize="sm" paddingRight="7px">
            removed:{' '}
            {moment
              .tz(qaa.removed_at, 'Asia/Manila')
              .format('DD.MM.YYYY HH:mm')}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
};

export default QaaListItem;
