import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestQaas(params) {
  // Updated function name

  let url = `${BACKEND_URL}/qaa/latest`;

  // Add type parameter if not null
  if (params && params.type !== null && params.type !== undefined) {
    url += `?type=${params.type}`;
  }

  // Add showRemoved parameter if not null
  if (
    params &&
    params.showRemoved !== null &&
    params.showRemoved !== undefined
  ) {
    // If type is already present, use "&" to add the showRemoved parameter
    url +=
      params.type !== null && params.type !== undefined
        ? `&showRemoved=${params.showRemoved}`
        : `?showRemoved=${params.showRemoved}`;
  }
  const res = await API.get(url, true);
  return res;
}

async function getAllQaasGroupedByDate() {
  const res = await API.get(`${BACKEND_URL}/qaa/groupedByDate`, true);
  return res;
}

async function removeQaa(id) {
  // Updated function name and endpoint
  const res = await API.post(`${BACKEND_URL}/qaa/remove/${id}`, null, true);
  return res;
}

async function createQaa(data) {
  // Updated function name
  const res = await API.post(`${BACKEND_URL}/qaa`, data, true); // Updated endpoint
  return res;
}

async function editQaa(data) {
  // Updated function name
  const res = await API.put(`${BACKEND_URL}/qaa/${data?.id}`, data, true); // Updated endpoint
  return res;
}

export default {
  getLatestQaas,
  getAllQaasGroupedByDate,
  removeQaa,
  createQaa,
  editQaa,
};
