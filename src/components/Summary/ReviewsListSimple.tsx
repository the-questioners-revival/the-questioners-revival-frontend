import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReviewsApi from '../../api/review';
import useAbstractProvider from '../../providers/AbstractProvider';
import moment from 'moment';
import ReviewListItemSimple from '../Reviews/ReviewListItemSimple';
import useAbstractMutator from '../../providers/AbstractMutator';

const ReviewsListSimple = ({
  startDate,
  endDate,
  type,
}: {
  startDate: any;
  endDate: any;
  type: string;
}) => {
  const {
    data: getReviewsFromToData,
    refetch: getReviewsFromTo,
  }: { data: any; refetch: Function } = useAbstractProvider(
    ReviewsApi.getReviewsFromTo,
    null,
    false,
  );

  const {
    data: editReviewData,
    mutate: editReview,
  }: { data: any; mutate: Function } = useAbstractMutator(
    ReviewsApi.editReview,
  );

  useEffect(() => {
    if (editReviewData) {
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
  }, [editReviewData]);

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
      {getReviewsFromToData?.length > 0 ? (
        getReviewsFromToData?.map((review: any) => (
          <ReviewListItemSimple review={review} editReview={editReview} />
        ))
      ) : (
        <Text>No {type} goals</Text>
      )}
    </Box>
  );
};

export default ReviewsListSimple;
