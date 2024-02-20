import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ReviewListItemSimple from '../Reviews/ReviewListItemSimple';
import ReviewsProvider from '../../providers/ReviewsProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';

const ReviewsListSimple = ({
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
    getReviewsFromToData,
    getReviewsFromTo,
    getReviewsFromToLoading,
    editReviewData,
    editReview,
  } = ReviewsProvider();

  useEffect(() => {
    setLoading(getReviewsFromToLoading);
  }, [getReviewsFromToLoading]);

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
