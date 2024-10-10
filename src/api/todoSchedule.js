import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();
async function createTodoSchedule(data) {
  const res = await API.post(`${BACKEND_URL}/todo-schedule`, data, true);
  return res;
}

export default {
  createTodoSchedule,
};
