import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function getHello() {
  const res = await API.get(`${BACKEND_URL}/`, true);
  return res;
}

async function getRandomQuote(type) {
  const res = await API.get(
    `${BACKEND_URL}/quote${type ? '/' + type : ''}`,
    true,
  );
  return res;
}

async function search(searchString) {
  const res = await API.get(
    `${BACKEND_URL}/search/${searchString ? searchString : ''}`,
    true,
  );
  return res;
}

export default {
  getHello,
  getRandomQuote,
  search,
};
