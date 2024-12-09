import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestCategories() {
  const res = await API.get(`${BACKEND_URL}/category/latest`, true);
  return res;
}

async function getCategoryTree() {
  const res = await API.get(`${BACKEND_URL}/category/tree`, true);
  return res;
}

async function getCategoriesFromTo(data) {
  const res = await API.get(
    `${BACKEND_URL}/category/fromTo?type=${data.type}&from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function getAllCategoriesGroupedByDate(data) {
  const res = await API.get(
    `${BACKEND_URL}/category/groupedByDate?from=${data?.from}&to=${data?.to}`,
    true,
  );
  return res;
}

async function removeCategory(id) {
  const res = await API.post(
    `${BACKEND_URL}/category/remove/${id}`,
    null,
    true,
  );
  return res;
}

async function createCategory(data) {
  const res = await API.post(`${BACKEND_URL}/category`, data, true);
  return res;
}

async function editCategory(data) {
  const res = await API.put(`${BACKEND_URL}/category/${data.id}`, data, true);
  return res;
}

export default {
  getLatestCategories,
  getAllCategoriesGroupedByDate,
  removeCategory,
  createCategory,
  editCategory,
  getCategoriesFromTo,
  getCategoryTree,
};
