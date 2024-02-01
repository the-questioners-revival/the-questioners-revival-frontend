import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestTodos() {
  const res = await API.get(`${BACKEND_URL}/todo/latest`, true);
  return res;
}

async function getAllTodosGroupedByDate() {
  const res = await API.get(`${BACKEND_URL}/todo/groupedByDate`, true);
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

export default {
  getLatestTodos,
  completeTodo,
  inprogressTodo,
  removeTodo,
  createTodo,
  getAllTodosGroupedByDate,
};
