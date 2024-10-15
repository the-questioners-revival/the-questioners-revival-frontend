import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestTodos(params) {
  let url = `${BACKEND_URL}/todo/latest`;
  const queryParams = [];

  if (params) {
    if (params.type) queryParams.push(`type=${params.type}`);
    if (params.status) queryParams.push(`status=${params.status}`);
    if (params.priority) queryParams.push(`priority=${params.priority}`);
    if (params.limit) queryParams.push(`limit=${params.limit}`);
    if (params.offset) queryParams.push(`offset=${params.offset}`);
  }

  // Join the query parameters with '&' and append to the URL
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
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
};
