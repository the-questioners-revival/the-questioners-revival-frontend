import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getCurrentlyLoggedInUser() {
  const res = await API.get(`${BACKEND_URL}/users/me`, true);
  return res;
}

async function login(data) {
  const res = await API.post(`${BACKEND_URL}/auth/login`,data, true);
  return res;
}

export default {
  getCurrentlyLoggedInUser,
  login
};
