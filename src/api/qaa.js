import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestQaas(params) {
  console.log('params: ', params);
  let url = `${BACKEND_URL}/qaa/latest`;
  const queryParams = [];

  if (params) {
    if (params.type) queryParams.push(`type=${params.type}`);
    if (params.showRemoved)
      queryParams.push(`showRemoved=${params.showRemoved}`);
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

async function getAllQaasGroupedByDate(data) {
  const res = await API.get(
    `${BACKEND_URL}/qaa/groupedByDate?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getQaaById(id) {
  const res = await API.get(
    `${BACKEND_URL}/qaa/${id}`,
    true,
  );
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
  getQaaById,
  getAllQaasGroupedByDate,
  removeQaa,
  createQaa,
  editQaa,
};
