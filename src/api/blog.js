import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getLatestBlogs() {
  const res = await API.get(`${BACKEND_URL}/blog/latest`, true);
  return res;
}

async function getAllBlogsGroupedByDate() {
  const res = await API.get(`${BACKEND_URL}/blog/groupedByDate`, true);
  return res;
}

async function removeBlog(id) {
  const res = await API.post(`${BACKEND_URL}/blog/remove/${id}`, null, true);
  return res;
}

async function createBlog(data) {
  const res = await API.post(`${BACKEND_URL}/blog`, data, true);
  return res;
}

async function editBlog(data) {
  const res = await API.put(`${BACKEND_URL}/blog/${data.id}`, data, true);
  return res;
}

export default {
  getLatestBlogs,
  getAllBlogsGroupedByDate,
  removeBlog,
  createBlog,
  editBlog
};
