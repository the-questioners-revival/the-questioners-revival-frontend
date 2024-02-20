import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import GoalListItemSimple from '../Goals/GoalListItemSimple';
import GoalsProvider from '../../providers/GoalsProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';

const GoalsListSimple = ({
  startDate,
  endDate,
  type,
}: {
  startDate: any;
  endDate: any;
  type: string;
}) => {
  const { setLoading } = useFloatingLoader();

  const {
    getGoalsFromToData,
    getGoalsFromTo,
    getGoalsFromToLoading,
    editGoalData,
    editGoal,
  } = GoalsProvider();

  useEffect(() => {
    setLoading(getGoalsFromToLoading);
  }, [getGoalsFromToLoading]);

  useEffect(() => {
    if (editGoalData) {
      let start, end;
      if (type === 'weekly') {
        start = moment(startDate).startOf('week');
        end = moment(startDate).endOf('week');
      }
      if (type === 'monthly') {
        start = moment(startDate).startOf('month');
        end = moment(startDate).endOf('month');
      }
      if (type === 'yearly') {
        start = moment(startDate).startOf('year');
        end = moment(startDate).endOf('year');
      }
      getGoalsFromTo({
        from: start?.toISOString(),
        to: end?.toISOString(),
        type,
      });
    }
  }, [editGoalData]);

  useEffect(() => {
    if (startDate && endDate) {
      let start, end;
      if (type === 'weekly') {
        start = moment(startDate).startOf('week');
        end = moment(startDate).endOf('week');
      }
      if (type === 'monthly') {
        start = moment(startDate).startOf('month');
        end = moment(startDate).endOf('month');
      }
      if (type === 'yearly') {
        start = moment(startDate).startOf('year');
        end = moment(startDate).endOf('year');
      }
      getGoalsFromTo({
        from: start?.toISOString(),
        to: end?.toISOString(),
        type,
      });
    }
  }, [startDate, endDate, type]);

  return (
    <Box marginBottom="20px">
      <Heading as="h1" fontSize="2xl" marginBottom="5px">
        Goals List
      </Heading>
      {getGoalsFromToData?.length > 0 ? (
        getGoalsFromToData?.map((goal: any) => (
          <GoalListItemSimple goal={goal} editGoal={editGoal} />
        ))
      ) : (
        <Text>No {type} goals</Text>
      )}
    </Box>
  );
};

export default GoalsListSimple;
