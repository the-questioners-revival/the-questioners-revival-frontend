import { Box, Flex, Switch, Tag, Text } from '@chakra-ui/react';

const GoalListItemSimple = ({
  goal,
  editGoal,
}: {
  goal: any;
  editGoal: Function;
}) => {
  return (
    <Flex
      justifyContent="space-between"
      marginBottom="10px"
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
      <Flex>
        <Switch
          isChecked={goal.completed_at}
          onChange={(e) => {
            editGoal({
              ...goal,
              completed_at: e.target.checked === true ? new Date() : null,
            });
          }}
        ></Switch>
      </Flex>
    </Flex>
  );
};

export default GoalListItemSimple;
