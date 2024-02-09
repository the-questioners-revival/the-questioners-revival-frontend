import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Tag,
  Text,
} from '@chakra-ui/react';
import CustomModal from '../custom/CustomModal';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import { useEffect, useState } from 'react';
import CreateGoalForm from '../Goals/CreateGoalForm';
import EditGoalForm from '../Goals/EditGoalForm';
import GoalsApi from '../../api/goal';
import useAbstractMutator from '../../providers/AbstractMutator';
import useAbstractProvider from '../../providers/AbstractProvider';
import moment from 'moment';
import GoalListItem from '../Goals/GoalListItem';

const GoalsList = ({
  startDate,
  endDate,
  type,
}: {
  startDate: any;
  endDate: any;
  type: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [isOpenCreateGoalModal, setIsOpenCreateGoalModal] = useState(false);
  const [isOpenEditGoalModal, setIsOpenEditGoalModal] = useState(false);
  const [isOpenDeleteGoalModal, setIsOpenDeleteGoalModal] = useState(false);

  const {
    data: getGoalsFromToData,
    refetch: getGoalsFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
    GoalsApi.getGoalsFromTo,
    null,
    false,
  );

  const {
    data: createGoalData,
    mutate: createGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.createGoal);

  const {
    data: editGoalData,
    mutate: editGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.editGoal);

  const {
    data: removeGoalData,
    mutate: removeGoal,
  }: { data: any; mutate: Function } = useAbstractMutator(GoalsApi.removeGoal);

  useEffect(() => {
    if (createGoalData || editGoalData || removeGoalData) {
      let start, end;
      if (type === 'weekly') {
        start = moment(startDate).startOf('week');
        end = moment(startDate).endOf('week');
      }
      if (type === 'monthly') {
        start = moment(startDate).startOf('month');
        end = moment(startDate).endOf('month');
      }
      if (type === 'monthly') {
        start = moment(startDate).startOf('year');
        end = moment(startDate).endOf('year');
      }

      getGoalsFromTo({
        from: start?.toISOString(),
        to: end?.toISOString(),
        type,
      });
    }
  }, [createGoalData, editGoalData, removeGoalData]);

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
        <GoalListItem
          goal={goal}
          setSelectedItem={setSelectedItem}
          setIsOpenEditGoalModal={setIsOpenEditGoalModal}
          setIsOpenDeleteGoalModal={setIsOpenDeleteGoalModal}
        />
      ))}
      <Button
        mt={4}
        display="flex"
        colorScheme="teal"
        type="submit"
        onClick={() => {
          setIsOpenCreateGoalModal(true);
        }}
      >
        Add Goal
      </Button>
      <CustomModal
        isOpen={isOpenCreateGoalModal}
        closeModal={() => setIsOpenCreateGoalModal(false)}
      >
        <ModalHeader>New Goal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateGoalForm
            createGoal={(data: any) => {
              createGoal(data);
              setIsOpenCreateGoalModal(false);
            }}
            date={startDate}
          />
        </ModalBody>
      </CustomModal>
      <CustomModal
        isOpen={isOpenEditGoalModal}
        closeModal={() => setIsOpenEditGoalModal(false)}
      >
        <ModalHeader>Edit Goal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditGoalForm
            editGoal={(data: any) => {
              editGoal(data);
              setIsOpenEditGoalModal(false);
            }}
            goal={selectedItem}
          />
        </ModalBody>
      </CustomModal>
      <CustomConfirmationModal
        isOpen={isOpenDeleteGoalModal}
        closeModal={() => setIsOpenDeleteGoalModal(false)}
        primaryAction={() => {
          removeGoal(selectedItem?.id);
          setIsOpenDeleteGoalModal(false);
        }}
        secondaryAction={() => {}}
        title={`Remove goal`}
        description={`Are you sure you want to remove goal with id ${selectedItem?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
    </Box>
  );
};

export default GoalsList;
