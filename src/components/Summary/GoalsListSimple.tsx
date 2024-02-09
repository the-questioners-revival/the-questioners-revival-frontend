import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import GoalsApi from '../../api/goal';
import useAbstractProvider from '../../providers/AbstractProvider';
import moment from 'moment';
import GoalListItemSimple from '../Goals/GoalListItemSimple';
import useAbstractMutator from '../../providers/AbstractMutator';

const GoalsListSimple = ({
  startDate,
  endDate,
  type,
}: {
  startDate: any;
  endDate: any;
  type: string;
}) => {
  const {
    data: getGoalsFromToData,
    refetch: getGoalsFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
    GoalsApi.getGoalsFromTo,
    null,
    false,
  );

  const {
    data: editGoalData,
    mutate: editGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.editGoal);

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
      {getGoalsFromToData?.map((goal: any) => (
        <GoalListItemSimple goal={goal} editGoal={editGoal} />
      ))}
      
    </Box>
  );
};

export default GoalsListSimple;
