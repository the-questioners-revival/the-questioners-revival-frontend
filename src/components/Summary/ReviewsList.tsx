import {
  Box,
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';
import CustomModal from '../custom/CustomModal';
import CustomConfirmationModal from '../custom/CustomConfirmationModal';
import { useEffect, useState } from 'react';
import CreateReviewForm from '../Reviews/CreateReviewForm';
import EditReviewForm from '../Reviews/EditReviewForm';
import moment from 'moment';
import ReviewListItem from '../Reviews/ReviewListItem';
import ReviewsProvider from '../../providers/ReviewsProvider';

const ReviewsList = ({
  startDate,
  endDate,
  type,
}: {
  startDate: any;
  endDate: any;
  type: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [isOpenCreateReviewModal, setIsOpenCreateReviewModal] = useState(false);
  const [isOpenEditReviewModal, setIsOpenEditReviewModal] = useState(false);
  const [isOpenDeleteReviewModal, setIsOpenDeleteReviewModal] = useState(false);

  const {
    getReviewsFromToData,
    getReviewsFromTo,
    createReviewData,
    createReview,
    editReviewData,
    editReview,
    removeReviewData,
    removeReview,
  } = ReviewsProvider();

  useEffect(() => {
    if (createReviewData || editReviewData || removeReviewData) {
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

      getReviewsFromTo({
        from: start?.toISOString(),
        to: end?.toISOString(),
        type,
      });
    }
  }, [createReviewData, editReviewData, removeReviewData]);

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
      getReviewsFromTo({
        from: start?.toISOString(),
        to: end?.toISOString(),
        type,
      });
    }
  }, [startDate, endDate, type]);

  return (
    <Box marginBottom="20px">
      <Heading as="h1" fontSize="2xl" marginBottom="5px">
        Reviews List
      </Heading>
      {getReviewsFromToData?.map((review: any) => (
        <ReviewListItem
          review={review}
          setSelectedItem={setSelectedItem}
          setIsOpenEditReviewModal={setIsOpenEditReviewModal}
          setIsOpenDeleteReviewModal={setIsOpenDeleteReviewModal}
        />
      ))}
      <Button
        mt={4}
        display="flex"
        colorScheme="teal"
        type="submit"
        onClick={() => {
          setIsOpenCreateReviewModal(true);
        }}
      >
        Add Review
      </Button>
      <CustomModal
        isOpen={isOpenCreateReviewModal}
        closeModal={() => setIsOpenCreateReviewModal(false)}
      >
        <ModalHeader>New Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateReviewForm
            createReview={(data: any) => {
              createReview(data);
              setIsOpenCreateReviewModal(false);
            }}
            date={startDate}
          />
        </ModalBody>
      </CustomModal>
      <CustomModal
        isOpen={isOpenEditReviewModal}
        closeModal={() => setIsOpenEditReviewModal(false)}
      >
        <ModalHeader>Edit Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditReviewForm
            editReview={(data: any) => {
              editReview(data);
              setIsOpenEditReviewModal(false);
            }}
            review={selectedItem}
          />
        </ModalBody>
      </CustomModal>
      <CustomConfirmationModal
        isOpen={isOpenDeleteReviewModal}
        closeModal={() => setIsOpenDeleteReviewModal(false)}
        primaryAction={() => {
          removeReview(selectedItem?.id);
          setIsOpenDeleteReviewModal(false);
        }}
        secondaryAction={() => {}}
        title={`Remove review`}
        description={`Are you sure you want to remove review with id ${selectedItem?.id}`}
        primaryActionText="Remove"
        secondaryActionText="Cancel"
      />
    </Box>
  );
};

export default ReviewsList;
