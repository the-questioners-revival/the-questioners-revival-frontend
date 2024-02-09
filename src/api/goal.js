import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestGoals() {
  const res = await API.get(`${BACKEND_URL}/goal/latest`, true);
  return res;
}

async function getGoalsFromTo(data) {
  const res = await API.get(
    `${BACKEND_URL}/goal/fromTo?type=${data.type}&from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getAllGoalsGroupedByDate(data) {
  const res = await API.get(
    `${BACKEND_URL}/goal/groupedByDate?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function removeGoal(id) {
  const res = await API.post(`${BACKEND_URL}/goal/remove/${id}`, null, true);
  return res;
}

async function createGoal(data) {
  const res = await API.post(`${BACKEND_URL}/goal`, data, true);
  return res;
}

async function editGoal(data) {
  const res = await API.put(`${BACKEND_URL}/goal/${data.id}`, data, true);
  return res;
}

export default {
  getLatestGoals,
  getAllGoalsGroupedByDate,
  removeGoal,
  createGoal,
  editGoal,
  getGoalsFromTo,
};
