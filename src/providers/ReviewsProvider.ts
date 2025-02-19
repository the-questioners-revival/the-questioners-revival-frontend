import useAbstractMutator from './AbstractMutator';
import useAbstractProvider from './AbstractProvider';
import ReviewsApi from '../api/review';

export default function ReviewsProvider() {
  const {
    data: getReviewsFromToData,
    refetch: getReviewsFromTo,
    loading: getReviewsFromToLoading,
  }: { data: any; refetch: Function; loading: boolean } = useAbstractProvider(
    ReviewsApi.getReviewsFromTo,
    null,
    false,
  );

  const {
    data: createReviewData,
    mutate: createReview,
  }: { data: any; mutate: Function } = useAbstractMutator(
    ReviewsApi.createReview,
  );

  const {
    data: editReviewData,
    mutate: editReview,
  }: { data: any; mutate: Function } = useAbstractMutator(
    ReviewsApi.editReview,
  );

  const {
    data: removeReviewData,
    mutate: removeReview,
  }: { data: any; mutate: Function } = useAbstractMutator(
    ReviewsApi.removeReview,
  );

  return {
    getReviewsFromToData,
    getReviewsFromTo,
    getReviewsFromToLoading,
    createReviewData,
    createReview,
    editReviewData,
    editReview,
    removeReviewData,
    removeReview,
  };
}
