import { BACKEND_URL } from '../helpers/configuration';
import Api from '.';

const API = Api();

async function uploadImage(formData) {
  const res = await API.post(
    `${BACKEND_URL}/images/upload`,
    formData,
    true
  );
  return res;
}



export default {
  uploadImage
};
