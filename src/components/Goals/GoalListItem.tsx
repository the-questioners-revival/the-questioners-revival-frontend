import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Switch, Tag, Text, useColorModeValue } from "@chakra-ui/react";

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
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');

  return (
    <Flex
      justifyContent="space-between"
      bgColor={bgColor}
      color={color}
      border="2px solid white"
      borderRadius="10"
      padding="5px 10px"
    >
      <Flex>
        <Text marginRight="10px">{goal.title}</Text>
        <Box>
          <Tag>{goal.type}</Tag>
        </Box>
      </Flex>
      <Flex alignItems="center">
        <Switch
          paddingRight="15px"
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
          maxH="16px"
        >
          <EditIcon w={4} h={4} color={color} />
        </Flex>
        <Flex
          w="100%"
          h="100%"
          cursor="pointer"
          maxH="16px"
          onClick={() => {
            setSelectedItem(goal);
            setIsOpenDeleteGoalModal(true);
          }}
        >
          <CloseIcon w={4} h={4} color={color} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GoalListItem;
