import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestHabits(params) {
  let url = `${BACKEND_URL}/habit/latest`;

  // Add type parameter if not null
  if (params && params.type !== null && params.type !== undefined) {
    url += `?type=${params.type}`;
  }

  // Add status parameter if not null
  if (params && params.status !== null && params.status !== undefined) {
    // If type is already present, use "&" to add the status parameter
    url +=
      params.type !== null && params.type !== undefined
        ? `&status=${params.status}`
        : `?status=${params.status}`;
  }
  const res = await API.get(url, true);
  return res;
}

async function getAllHabitsGroupedByDate() {
  const res = await API.get(`${BACKEND_URL}/habit/groupedByDate`, true);
  return res;
}

async function completeHabit(id) {
  const res = await API.post(`${BACKEND_URL}/habit/complete/${id}`, null, true);
  return res;
}

async function inprogressHabit(id) {
  const res = await API.post(
    `${BACKEND_URL}/habit/inprogress/${id}`,
    null,
    true,
  );
  return res;
}

async function removeHabit(id) {
  const res = await API.post(`${BACKEND_URL}/habit/remove/${id}`, null, true);
  return res;
}

async function createHabit(data) {
  const res = await API.post(`${BACKEND_URL}/habit`, data, true);
  return res;
}

async function editHabit(data) {
  const res = await API.put(`${BACKEND_URL}/habit/${data?.id}`, data, true); // Updated endpoint
  return res;
}

export default {
  getLatestHabits,
  completeHabit,
  inprogressHabit,
  removeHabit,
  createHabit,
  getAllHabitsGroupedByDate,
  editHabit,
};
