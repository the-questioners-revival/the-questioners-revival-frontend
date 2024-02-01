import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestQaas() { // Updated function name
  const res = await API.get(`${BACKEND_URL}/qaa/latest`, true); // Updated endpoint
  return res;
}

async function getAllQaasGroupedByDate() {
  const res = await API.get(`${BACKEND_URL}/qaa/groupedByDate`, true);
  return res;
}

async function removeQaa(id) { // Updated function name and endpoint
  const res = await API.post(`${BACKEND_URL}/qaa/remove/${id}`, null, true);
  return res;
}

async function createQaa(data) { // Updated function name
  const res = await API.post(`${BACKEND_URL}/qaa`, data, true); // Updated endpoint
  return res;
}

export default {
  getLatestQaas,
  getAllQaasGroupedByDate,
  removeQaa,
  createQaa,
};
