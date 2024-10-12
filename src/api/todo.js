import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestTodos(params) {
  let url = `${BACKEND_URL}/todo/latest`;

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

  // Add priority parameter if not null
  if (params && params.priority !== null && params.priority !== undefined) {
    // If type or status is already present, use "&" to add the priority parameter
    url +=
      (params.type !== null && params.type !== undefined) ||
      (params.status !== null && params.status !== undefined)
        ? `&priority=${params.priority}`
        : `?priority=${params.priority}`;
  }

  const res = await API.get(url, true);
  return res;
}

async function getAllTodosGroupedByDate(data) {
  const res = await API.get(
    `${BACKEND_URL}/todo/groupedByDate?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getDailyActivityCounts() {
  const res = await API.get(`${BACKEND_URL}/todo/activity/daily`, true);
  return res;
}

async function getAllTodos(params) {
  let url = `${BACKEND_URL}/todo`;

  // Add type parameter if not null
  if (params && params.status !== null && params.status !== undefined) {
    url += `?status=${params.status}`;
  }
  const res = await API.get(url, true);
  return res;
}

async function completeTodo(id) {
  const res = await API.post(`${BACKEND_URL}/todo/complete/${id}`, null, true);
  return res;
}

async function inprogressTodo(id) {
  const res = await API.post(
    `${BACKEND_URL}/todo/inprogress/${id}`,
    null,
    true,
  );
  return res;
}

async function removeTodo(id) {
  const res = await API.post(`${BACKEND_URL}/todo/remove/${id}`, null, true);
  return res;
}

async function createTodo(data) {
  const res = await API.post(`${BACKEND_URL}/todo`, data, true);
  return res;
}

async function editTodo(data) {
  const res = await API.put(`${BACKEND_URL}/todo/${data?.id}`, data, true); // Updated endpoint
  return res;
}

export default {
  getLatestTodos,
  completeTodo,
  inprogressTodo,
  removeTodo,
  createTodo,
  getAllTodosGroupedByDate,
  getAllTodos,
  editTodo,
  getDailyActivityCounts,
};
