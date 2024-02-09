import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestReviews() {
  const res = await API.get(`${BACKEND_URL}/review/latest`, true);
  return res;
}

async function getReviewsFromTo(data) {
  const res = await API.get(
    `${BACKEND_URL}/review/fromTo?type=${data.type}&from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getAllReviewsGroupedByDate(data) {
  const res = await API.get(
    `${BACKEND_URL}/review/groupedByDate?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function removeReview(id) {
  const res = await API.post(`${BACKEND_URL}/review/remove/${id}`, null, true);
  return res;
}

async function createReview(data) {
  const res = await API.post(`${BACKEND_URL}/review`, data, true);
  return res;
}

async function editReview(data) {
  const res = await API.put(`${BACKEND_URL}/review/${data.id}`, data, true);
  return res;
}

export default {
  getLatestReviews,
  getAllReviewsGroupedByDate,
  removeReview,
  createReview,
  editReview,
  getReviewsFromTo,
};
