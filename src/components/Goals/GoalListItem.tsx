import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Switch, Tag, Text } from '@chakra-ui/react';

const GoalListItem = ({
  goal,
  setSelectedItem,
  setIsOpenEditGoalModal,
  setIsOpenDeleteGoalModal,
  editGoal,
}: {
  goal: any;
  setSelectedItem: any;
  setIsOpenEditGoalModal: Function;
  setIsOpenDeleteGoalModal: Function;
  editGoal: Function;
}) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Text marginRight="10px">{goal.title}</Text>
        <Box>
          <Tag>{goal.type}</Tag>
        </Box>
      </Flex>
      <Flex>
        <Switch
          isChecked={goal.completed_at}
          onChange={(e) =>
            e.target.checked === true
              ? editGoal({
                  ...goal,
                  completed_at: new Date(),
                })
              : editGoal({
                  ...goal,
                  completed_at: null,
                })
          }
        ></Switch>
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
