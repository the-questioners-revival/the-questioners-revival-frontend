import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Tag, Text } from '@chakra-ui/react';

const GoalListItem = ({
  goal,
  setSelectedItem,
  setIsOpenEditGoalModal,
  setIsOpenDeleteGoalModal,
}: {
  goal: any;
  setSelectedItem: any;
  setIsOpenEditGoalModal: Function;
  setIsOpenDeleteGoalModal: Function;
}) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Text marginRight="10px">{goal.title}</Text>
        <Tag>{goal.type}</Tag>
      </Flex>
      <Flex>
        <Flex
          w="100%"
          h="100%"
          cursor="pointer"
          onClick={() => {
            setSelectedItem(goal);
            setIsOpenEditGoalModal(true);
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
            setSelectedItem(goal);
            setIsOpenDeleteGoalModal(true);
          }}
        >
          <CloseIcon w={4} h={4} color="white" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GoalListItem;
